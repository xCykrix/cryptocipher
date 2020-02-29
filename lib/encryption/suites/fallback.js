/**
   * Execute Encryption Suite of Target Algorithms.
   *
   * @param {string} text content to encrypt
   * @param {string} key key to use for encryption secret
   * @returns {object} key, tag, aad, data
   * @memberof ExecutionSuiteAES
   */
module.exports.encrypt = async (text, key, configuration) => {
  const verifiedSchema = await vSchema(configuration)
  return new Promise((resolve, reject) => {
    // Validating Ciphers
    if (verifiedSchema === undefined) {
      return reject(new Error('[schema] failed to process schema, create an issue'))
    }
    if (!key || key.length !== verifiedSchema.keyLength) {
      return reject(new Error('[key] invalid key length'))
    }
    if (!text || text.length === 0) {
      return reject(new Error('[text] invalid text input'))
    }

    // Deprecated Ciphers Location
    const disabled = ['des3-wrap', 'id-smime-alg-CMS3DESwrap']
    if (disabled.indexOf(configuration.requestedImplementation) > -1 && process.env.ALLOW_UNSAFE_CIPHERS !== 'TRUE') {
      process.emitWarning([`Using "${configuration.requestedImplementation}" can possibly create a segmentation fault in random appearances in`, 'certain environment configurations. Please use with care, as these errors are not stoppable and will result in SIGSEGV signal', 'which likely ends in exiting.'].join('\n'), 'DEGRADED_CIPHER')
      return reject(new Error(`[schema] "${configuration.requestedImplementation}" is currently disabled, please set ALLOW_UNSAFE_CIPHERS=TRUE in the environment to enable`))
    }

    // Build Encryption Data
    const inEval = {
      cipher: configuration.requestedImplementation,
      secret: key,
      vector: require('../../util/vector')(verifiedSchema.ivLength),
      aad: require('../../util/vector')(10),
      data: text
    }

    try {
      // Check for Additional Options
      const opts = {}
      if (verifiedSchema.tagLength) {
        opts.authTagLength = verifiedSchema.tagLength
      }

      // Create Cipher IV
      const r = require('crypto').createCipheriv(inEval.cipher, inEval.secret, inEval.vector, { ...opts })

      // Execute Authentication Drive & Data Validation
      try {
        r.setAAD(Buffer.from(inEval.aad, 'hex'), {
          plaintextLength: require('../../util/byte')(inEval.data)
        })
      } catch {
        this.ignored = true
      }

      // Execute Cipher IV
      const encrypted = r.update(inEval.data)
      const encryptedFinal = Buffer.concat([encrypted, r.final()])

      // Check For Additional Content Data
      const partialData = {}
      try {
        partialData.tag = r.getAuthTag().toString('hex')
      } catch (e) {
        this.ignored = true
      }
      try {
        partialData.aad = inEval.aad
      } catch (e) {
        this.ignored = true
      }

      return resolve({
        suite: inEval.cipher,
        key: inEval.secret,
        data: inEval.vector + '/' + encryptedFinal.toString('hex'),
        ...partialData
      })
    } catch (e) {
      return reject(e)
    }
  })
}

module.exports.decrypt = async (text, key, tag, aad, configuration) => {
  const verifiedSchema = await vSchema(configuration)
  return new Promise((resolve, reject) => {
    // Validating Ciphers
    if (verifiedSchema === undefined) {
      return reject(new Error('[schema] failed to process schema, create an issue'))
    }
    if (!key || key.length !== verifiedSchema.keyLength) {
      return reject(new Error('[key] invalid key length'))
    }
    if (!text || text.length === 0) {
      return reject(new Error('[text] invalid text input'))
    }

    // Build Decryption Data
    const inEval = {
      cipher: configuration.requestedImplementation,
      secret: key,
      tag: tag,
      aad: aad,
      data: [text.split('/')[0], Buffer.from(text.split('/')[1], 'hex')]
    }

    try {
      // Check for Additional Options
      const opts = {}
      if (verifiedSchema.tagLength) {
        opts.authTagLength = verifiedSchema.tagLength
      }

      // Create Decipher IV
      const r = require('crypto').createDecipheriv(inEval.cipher, inEval.secret, inEval.data[0], { ...opts })

      // Execute Authentication Drive & Data Validation
      if (inEval.tag) r.setAuthTag(Buffer.from(inEval.tag, 'hex'))
      try {
        if (inEval.aad) {
          r.setAAD(Buffer.from(inEval.aad, 'hex'), {
            plaintextLength: inEval.data[1].length
          })
        }
      } catch (e) {
        this.ignored = true
      }

      // Execute Decipher IV
      const decrypted = r.update(inEval.data[1])
      const decryptedFinal = Buffer.concat([decrypted, r.final()])

      // Return Data of Non-Repeated Run
      return resolve({
        suite: inEval.cipher,
        key: inEval.secret,
        data: decryptedFinal.toString()
      })
    } catch (e) {
      return reject(e)
    }
  })
}

// Searches for Verified Schematics
async function vSchema (configuration) {
  const cipher = require('../../../ciphers.json')[configuration.convertedImplementation || configuration.requestedImplementation]
  return { ...cipher }
}
