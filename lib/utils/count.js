/**
 * Returns count of bytes of given input.
 *
 * @param {string} input The given String to count the encoded bytes of.
 * @returns {number} The number of bytes in the given input.
 */
function byteCount (input) {
  return encodeURI(input).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1
}

// Export Function
module.exports = byteCount
