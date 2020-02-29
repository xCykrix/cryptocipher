const crypto = require('../index')

async function runTest (verbose = (process.argv.indexOf('-v') > -1)) {
  const allCiphers = require('crypto').getCiphers()
  const cipherData = require('../ciphers.json')

  // Stats
  let disabled = 0
  let passed = 0
  let failed = 0

  // Verify Cache Integrity
  for (const cipher of Object.keys(cipherData)) {
    let missing = false
    if (allCiphers.indexOf(cipher) === -1 && allCiphers.indexOf(cipher.replace(/-/g, '')) === -1) {
      missing = true
    }
    if (missing) console.info(`[warn:enc:validate]: '${cipher}' is missing from master encryption list`)
  }

  if (process.argv.indexOf('--includeDisabled') > -1) {
    process.env.ALLOW_UNSAFE_CIPHERS = 'TRUE'
  }

  // Run Ciphers
  console.info('[test:enc:start]: starting encryption suite validation task')
  for (let i = 0; i < Object.keys(cipherData).length; i++) {
    const cipherName = Object.keys(cipherData)[i]

    const testingSuite = await crypto.fetch(cipherName).catch((e) => {
      console.error(`  -> [enc:failed-test]: '${cipherName}' > 1:failed to run > ${e.message}`, cipherData[cipherName])
      failed = failed + 1
    })
    if (testingSuite !== undefined) {
      const compareInput = require('../lib/util/vector')(1024)
      const encrypt = await testingSuite.encrypt(compareInput, require('../lib/util/vector')(cipherData[cipherName].keyLength), 3).catch((e) => {
        if (e.message.indexOf('disabled') === -1) {
          console.error(`  -> [enc:failed-test]: '${cipherName}' > 2:3:failed to encrypt > ${e.message}`, cipherData[cipherName])
          failed = failed + 1
        } else {
          disabled = disabled + 1
        }
      })
      if (encrypt !== undefined) {
        const decrypt = await testingSuite.decrypt(encrypt.data, encrypt.key, encrypt.tag, encrypt.aad).catch((e) => {
          if (e.message.indexOf('disabled') === -1) {
            console.error(`  -> [enc:failed-test]: '${cipherName}' > 3:2:failed to decrypt > ${e.message}`, cipherData[cipherName])
            failed = failed + 1
          } else {
            disabled = disabled + 1
          }
        })
        if (decrypt !== undefined) {
          if (compareInput === decrypt.data) {
            if (verbose) console.info(`  -> [enc:passed-test]: '${cipherName}' > 1:responded > ${encrypt.data.substring(0, 14)} > 1:verified > ${compareInput.substring(0, 14)}/${decrypt.data.substring(0, 14)} [${(encrypt.tag || '0').substring(0, 8)}:${(encrypt.aad || '0').substring(0, 8)}]`)
            passed = passed + 1
          } else {
            console.error(`  -> [enc:failed-test]: '${cipherName}' > 3:2:failed comparison`, cipherData[cipherName])
            failed = failed + 1
          }
        }
      }
      await sleep()
    }
  }
  console.info(`[test:enc:complete]: [${passed}/${(Object.keys(cipherData).length - disabled)}] (${disabled} disabled results omitted)`)

  // Post Exit Code
  if (passed !== Object.keys(cipherData).length - disabled) throw new Error('exiting with non-0 code, testing failed')
}
runTest()

// Testing Functions
function sleep () {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 32)
  })
}
