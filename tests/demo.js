const crypto = require('../index')

async function cipherDemo () {
  const cipherEngine = await crypto.fetch('aes-128-cfb8')
  const encryptedData = await cipherEngine.encrypt('hello world', '1231231231231231')
  /* encryptedData = {
    suite: 'aes-128-cfb8',
    key: '1231231231231231',
    data: 'ey=xyLht+!6}_=Z$/025c73f3fdaf4f4bc076da',
    aad: 'jV=AM06m?Q' <-- not always required in decryption, only certain ciphers require this
  } */
  console.info('Encryption', encryptedData)
  const decryptedData = await cipherEngine.decrypt(encryptedData.data, '1231231231231231')
  /* decryptedData = {
    suite: 'aes-128-cfb8',
    key: '1231231231231231',
    data: 'hello world'
  } */
  console.info('Decryption', decryptedData)
}
cipherDemo()

async function hashDemo () {
  const hashEngine = await crypto.fetch('sha512-256')
  const hashed = await hashEngine.digest('hello world')
  /* {
    suite: 'sha512-256',
    digest: 'base64',
    data: 'CsVh+sg4EE4/LkrRB7S+4+k4vxXysV8AnMzNYakT8Bc='
  } */
  console.info('Hashing', hashed)
}
hashDemo()
