const { IllegalInputException } = require('../../utils/errors')

class Driver {
  constructor (options) {
    this.options = options
  }

  /**
   * Execute a Hasing with the specified Driver.
   *
   * @param {string} content The plain text content to be hashed by the driver.
   * @param {string} digest The requested output encoding.
   */
  async digest (content, digest = 'base64') {
    if (!content || typeof content !== 'string' || content.length < 1) {
      throw new IllegalInputException('The provided content to hash is invalid, your content must have a length of at least 1 byte.')
    }

    if (!digest || typeof digest !== 'string' || digest.length < 1 || ['ascii', 'utf8', 'utf16le', 'ucs2', 'base64', 'latin1', 'binary', 'hex'].indexOf(digest) === -1) {
      throw new IllegalInputException('The provided digest for the hash output is invalid, your digest type must be a valid and lowercase encoding.')
    }

    // Create and Execute Hash
    const ch = require('crypto').createHash(this.options.identifier)

    ch.update(content)
    const hashed = ch.digest(digest)

    return {
      suite: this.options.identifier,
      digest: digest,
      data: hashed
    }
  }

  /**
   * Execute a Iterated Hasing with the specified Driver.
   *
   * @param {string} content The plain text content to be hashed by the driver.
   * @param {string} digest The requested output encoding.
   * @param {number} [iterations=16] The number of internal iterations to take on the plain text content.
   */
  async digestIter (content, digest, iterations = 16) {
    let hashed = await this.digest(content, digest)
    while (iterations - 1 !== 0) {
      hashed = await this.digest(hashed.data, digest)
      iterations--
    }
    return hashed
  }
}

// Export Driver
module.exports = Driver
