// Import Libraries and Super JSON
const ciphers = require('crypto').getCiphers()
const original = require('../lib/driver/crypto/super.json')
const { writeFileSync } = require('fs')

// Dispatch OS Ciphers
async function dispatch () {
  for (const cipher of ciphers) {
    await util(cipher)
  }

  // Update Ciphers Super File
  return writeFileSync('../lib/driver/crypto/super.json', JSON.stringify(original, undefined, 2))
}
dispatch()

// Test Cipher for Maximum Alloc
async function util (cipher) {
  // Create Template Object
  const entry = {
    ivLength: -1,
    keyLength: -1,
    tagLength: -1
  }

  // Check if Disabled
  if (original.disabled.indexOf(cipher) > -1) {
    entry.disabled = true
  }

  if (entry.disabled) {
    console.info(`[Auto-Detect] ${entry.disabled ? '(SKIPPED) ' : ''}${cipher} (IV:${entry.ivLength}) (TL:${entry.tagLength}) (KL:${entry.keyLength})`)

    // Update Object
    original.overrides[cipher] = entry

    return
  }

  // Index IV Length
  let attempts = 0
  let highest = 0
  while (entry.ivLength === -1) {
    const iv = require('../lib/utils/characters')(attempts)
    try {
      require('crypto').createCipheriv(cipher, '', iv, { authTagLength: 16 })
    } catch (err) {
      if (attempts > 64) {
        entry.ivLength = highest
        break
      }
      if (err.message.indexOf('key') > -1) {
        highest = attempts
        attempts++
        continue
      }
      if (err.message.indexOf('IV') > -1) {
        attempts++
        continue
      }
    }
  }

  // Index Auth Tag length
  attempts = 0
  highest = 0
  while (entry.tagLength === -1) {
    const iv = require('../lib/utils/characters')(entry.ivLength)
    try {
      require('crypto').createCipheriv(cipher, '', iv, { authTagLength: attempts })
    } catch (err) {
      if (attempts > 128) {
        entry.tagLength = highest
        break
      }
      if (err.message.indexOf('key') > -1) {
        highest = attempts
        attempts++
        continue
      }
      if (err.message.indexOf('authentication') > -1) {
        attempts++
        continue
      }
    }
  }

  // Index Secret Key Length
  attempts = 0
  highest = 0
  while (entry.keyLength === -1) {
    const iv = require('../lib/utils/characters')(entry.ivLength)
    const key = require('../lib/utils/characters')(attempts)
    const aad = require('../lib/utils/characters')(10)
    const body = require('../lib/utils/characters')(128)
    try {
      const civ = require('crypto').createCipheriv(cipher, key, iv, { authTagLength: entry.tagLength })

      try {
        civ.setAAD(Buffer.from(aad, 'hex'), {
          plaintextLength: require('../lib/utils/count')(body)
        })
      } catch (ignored) {}

      Buffer.concat([civ.update(body), civ.final()])

      highest = attempts
      attempts++
      if (attempts > 512) {
        entry.keyLength = 512
        break
      }
    } catch (err) {
      if (attempts > 512) {
        entry.keyLength = highest
        break
      }

      if (err.message.indexOf('key') > -1) {
        attempts++
        continue
      }
    }
  }

  // Notify Console
  console.info(`[Auto-Detect] ${cipher} (IV:${entry.ivLength}) (TL:${entry.tagLength}) (KL:${entry.keyLength})`)

  // Update Object
  original.overrides[cipher] = entry

  return entry
}
