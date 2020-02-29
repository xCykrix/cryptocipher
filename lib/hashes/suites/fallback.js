/**
   * Execute Hashing of Target Algorithms.
   *
   * @param {string} text
   * @returns {object} Object containing the suite and hashed data.
   * @memberof ExecutionSuiteAES
   */
module.exports.digest = async (text, digest = 'base64', configuration) => {
  return new Promise((resolve, reject) => {
    if (!configuration.requestedImplementation || configuration.requestedImplementation.length === 0) {
      return reject(new Error('[type] may not be undefined, please create an issue'))
    }
    if (!digest || digest.length === 0) {
      return reject(new Error('[digest] may not be undefined'))
    }
    if (['ascii', 'utf8', 'utf16le', 'ucs2', 'base64', 'latin1', 'binary', 'hex'].indexOf(digest) === -1) {
      return reject(new Error('[digest] unsupported encoding type'))
    }
    if (!text || text.length === 0) {
      return reject(new Error('[text] may not be undefined'))
    }

    const hash = require('crypto').createHash(configuration.requestedImplementation)
    hash.update(text)
    const output = hash.digest(digest)

    if (output === undefined || output.length === 0) {
      return reject(new Error('[digest] failed to digest input to hash'))
    }

    return resolve({ suite: configuration.requestedImplementation, digest: digest, data: output })
  })
}
