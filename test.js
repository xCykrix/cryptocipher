async function runtime () {
  const { fetch } = require('./index')
  const driver = await fetch('sha256')

  const hashed = await driver.digestIter('AAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'hex', '10000')
  console.info('logged-hash', hashed)
}
runtime()
