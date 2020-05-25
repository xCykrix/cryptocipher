const { ModuleSecurityException, IllegalInputException, IllegalSecretException } = require('../../utils/errors')

class Driver {
  constructor (options) {
    this.options = options
  }

  superify () {
    return require('./super.json').overrides[this.options.identifier]
  }

  /**
   * Execute a Encryption with the specified Driver.
   *
   * @param {string} content The plain text to be encrypted by the driver.
   * @param {string} secret The secret key to use during encryption by the driver.
   * @returns {object} The driver identifier, encrypted data, tag, and aad.
   */
  async encrypt (content, secret) {
    const bounds = this.superify()

    // Validate Input
    if (bounds.ivLength === -1 || bounds.tagLength === -1 || bounds.keyLength === -1) {
      throw new ModuleSecurityException(`${this.options.identifier} has violated the internal security policy of this module. [IDENTIFIER:MALFORMED_ENTRY,BOUNDS:NO_NEGATIVE]`)
    }

    if (!secret || typeof secret !== 'string' || secret.length !== bounds.keyLength) {
      throw new IllegalSecretException(`The provided secret is invalid, your secret must have a length of ${bounds.keyLength} bytes.`)
    }

    if (!content || typeof content !== 'string' || content.length < 1) {
      throw new IllegalInputException('The provided content to encrypt is invalid, your content must have a length of at least 1 byte.')
    }

    const processing = {
      cipher: this.options.identifier,
      key: secret,
      vector: require('../../utils/characters')(bounds.ivLength),
      aad: require('../../utils/characters')(10),
      data: content
    }

    const optsCiv = {}
    if (bounds.tagLength) {
      optsCiv.authTagLength = bounds.tagLength
    }

    // Create Cipheriv
    const civ = require('crypto').createCipheriv(processing.cipher, processing.key, processing.vector, { ...optsCiv })

    try {
      civ.setAAD(Buffer.from(processing.aad, 'hex'), {
        plaintextLength: require('../../utils/count')(processing.data)
      })
    } catch (ignored) {}

    // Execute Cipheriv
    const encrypted = Buffer.concat([civ.update(processing.data), civ.final()])

    const flags = {
      aad: processing.aad
    }

    try {
      flags.tag = civ.getAuthTag().toString('hex')
    } catch (ignored) {}

    return {
      suite: processing.cipher,
      data: processing.vector + '/' + encrypted.toString('hex'),
      ...flags
    }
  }

  /**
   * Execute a Decryption with the specified Driver.
   *
   * @param {string} content The encrypted text to be decrypted by the driver.
   * @param {string} secret The secret key to use during decryption by the driver.
   * @param {string} tag The authentication tag used during encryption.
   * @param {string} aad The additional authenticated data used during encryption.
   * @returns {object} The driver identifier and decrypted data.
   */
  async decrypt (content, secret, tag, aad) {
    const bounds = this.superify()

    if (bounds.ivLength === -1 || bounds.tagLength === -1 || bounds.keyLength === -1) {
      throw new ModuleSecurityException(`${this.options.identifier} has violated the internal security policy of this module. [IDENTIFIER:MALFORMED_ENTRY,BOUNDS:NO_NEGATIVE]`)
    }

    if (!secret || typeof secret !== 'string' || secret.length !== bounds.keyLength) {
      throw new IllegalSecretException(`The provided secret is invalid, your secret must have a length of ${bounds.keyLength} bytes.`)
    }

    if (!content || typeof content !== 'string' || content.length < 1) {
      throw new IllegalInputException('The provided content to encrypt is invalid, your content must have a length of at least 1 byte.')
    }

    const processing = {
      cipher: this.options.identifier,
      key: secret,
      tag,
      aad,
      data: [content.split('/')[0], Buffer.from(content.split('/')[1], 'hex')]
    }

    const divOpts = {}
    if (bounds.tagLength) {
      divOpts.authTagLength = bounds.tagLength
    }

    // Execute Decipheriv
    const div = require('crypto').createDecipheriv(processing.cipher, processing.key, processing.data[0], { ...divOpts })

    if (processing.tag) {
      div.setAuthTag(Buffer.from(processing.tag, 'hex'))
    }
    if (processing.aad) {
      try {
        div.setAAD(Buffer.from(processing.aad, 'hex'), {
          plaintextLength: processing.data[1].length
        })
      } catch (ignored) {}
    }

    const decrypted = Buffer.concat([div.update(processing.data[1]), div.final()])

    return {
      suite: processing.cipher,
      data: decrypted.toString()
    }
  }

  /**
   * Execute a Iterated Encryption with the specified Driver.
   *
   * @param {string} content The plain text to be encrypted by the driver.
   * @param {string} secret The secret key to use during encryption by the driver.
   * @param {number} [iterations=4] The number of internal iterations to take on the plain text content.
   * @returns {object} The driver identifier, encrypted data, tag, and aad.
   */
  async encryptIter (content, secret, iterations = 4) {
    let encrypted = await this.encrypt(content, secret)
    while (iterations - 1 !== 0) {
      encrypted = await this.encrypt(JSON.stringify(encrypted), secret)
      iterations--
    }
    return encrypted
  }

  /**
   * Execute a Iterated Decryption with the specified Driver.
   *
   * @param {string} content The encrypted text to be decrypted by the driver.
   * @param {string} secret The secret key to use during decryption by the driver.
   * @param {string} tag The authentication tag used during encryption.
   * @param {string} aad The additional authenticated data used during encryption.
   * @param {number} [iterations=4] The number of internal iterations to take for decrypting the encrypted data.
   * @returns {object} The driver identifier and decrypted data.
   */
  async decryptIter (content, secret, tag, aad, iterations = 4) {
    let decrypted = await this.decrypt(content, secret, tag, aad)
    while (iterations - 1 !== 0) {
      const next = JSON.parse(decrypted.data)
      decrypted = await this.decrypt(next.data, secret, next.tag, next.aad)
      iterations--
    }
    return decrypted
  }
}

module.exports = Driver
