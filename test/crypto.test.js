const chai = require('chai')
const expect = chai.expect

describe('Crypto#getCiphers()', function () {
  for (const suite of require('crypto').getCiphers()) {
    // Single Encrypt and Decrypt
    it(`${suite}: should not fail single encryption and decryption cycle`, async function () {
      try {
        const bounds = require('../lib/driver/crypto/super.json').overrides[suite]
        if (!bounds) {
          throw new chai.AssertionError(`${suite}: missing from master entries table`)
        }

        const secret = require('../lib/utils/characters')(bounds.keyLength)
        const content = require('../lib/utils/characters')(2048)

        const driver = await (require('../index')).fetch(suite)
        const encrypt = await driver.encrypt(content, secret)
        const decrypt = await driver.decrypt(encrypt.data, secret, encrypt.tag, encrypt.aad)

        expect(content).to.equal(decrypt.data)
      } catch (err) {
        if (err.message.indexOf('UNSTABLE') > -1) {
          this.skip()
        }
        throw err
      }
    })

    // Iteration Encrypt and Decrypt
    it(`${suite}: should not fail multiple encryption and decryption cycles`, async function () {
      try {
        const bounds = require('../lib/driver/crypto/super.json').overrides[suite]
        if (!bounds) {
          throw new chai.AssertionError(`${suite}: missing from master entries table`)
        }

        const secret = require('../lib/utils/characters')(bounds.keyLength)
        const content = require('../lib/utils/characters')(2048)

        const driver = await (require('../index')).fetch(suite)
        const encrypt = await driver.encryptIter(content, secret, 2)
        const decrypt = await driver.decryptIter(encrypt.data, secret, encrypt.tag, encrypt.aad, 2)

        expect(content).to.equal(decrypt.data)
      } catch (err) {
        if (err.message.indexOf('UNSTABLE') > -1) {
          this.skip()
        }
        throw err
      }
    })
  }
})
