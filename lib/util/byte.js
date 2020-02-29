/**
 * @description return count of bytes in input
 * @author Samuel Voeller <sammyvoeller@gmail.com>
 * @param {string} input string to count
 * @returns number
 */
function byteCount (input) {
  return encodeURI(input).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1
}
module.exports = byteCount
