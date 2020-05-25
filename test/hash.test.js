describe('Crypto#getHashes()', function () {
  for (const suite of require('crypto').getHashes()) {
    // Single Encrypt and Decrypt
    it(`${suite}: should not fail single hashing cycle`, async function () {
      const content = require('../lib/utils/characters')(4096)

      const driver = await (require('../index')).fetch(suite)
      await driver.digest(content)
    })

    // Iteration Encrypt and Decrypt
    it(`${suite}: should not fail multiple hashing cycles`, async function () {
      const content = require('../lib/utils/characters')(4096)

      const driver = await (require('../index')).fetch(suite)
      await driver.digest(content)
    })
  }
})
