/**
 * @description generate random string at selected length
 * @author Samuel J Voeller <sammyvoeller@gmail.com>
 * @param {number} bytes
 * @returns string
 */
function vector (bytes) {
  const char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890!*_-+=@#$%^&?[]{}'.split('')

  let iv = ''
  while (iv.length < bytes) {
    const c = char[Math.floor(Math.random() * char.length)]
    iv = iv + c
  }
  return iv
}
module.exports = vector
