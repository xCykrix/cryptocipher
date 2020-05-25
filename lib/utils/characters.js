/**
 * Generate arbitrary random String of a selected length.

 * @param {number} bytes Length of the random string.
 * @returns {string} "Random" string generated to requested input length with the internal character set.
 */
function characters (bytes) {
  const char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890!*_-+=@#$%^&?[]{}'.split('')

  let generated = ''
  while (generated.length < bytes) {
    const gChar = char[Math.floor(Math.random() * char.length)]
    generated = generated + gChar
  }
  return generated
}

// Export Function
module.exports = characters
