const { expect } = require('chai')

const { getCipher } = require('../../dist/index')
const { superify } = require('../../dist/lib/super/super.cipher')

describe('cipher: generate consistent integrity when provided with unacceptable states', function () {
  it('should report "id_unknown" when an unknown identifier is requested', function () {
    try {
      getCipher('invalidIdentifier')
    } catch (err) {
      expect(err.message).to.include('id_unknown')
    }
  })
  it('should report "id_disabled" when a disabled identifier is requested', function () {
    try {
      getCipher(superify().disabled[0])
    } catch (err) {
      expect(err.message).to.include('id_disabled')
    }
  })
  it('should report "OOB_keyLength" when identifier keyLength is incorrect', async function () {
    try {
      await getCipher('aes256').encrypt({
        key: '123',
        content: 'hello world'
      }).catch((err) => {
        expect(err.message).to.include('OOB_keyLength')
      })
      await getCipher('aes256').decrypt({
        key: '123',
        content: 'is never used'
      })
    } catch (err) {
      expect(err.message).to.include('OOB_keyLength')
    }
  })
  it('should report "OOB_contentLength" when content is empty', async function () {
    try {
      await getCipher('aes256').encrypt({
        key: '12312312312312313123141251231412',
        content: ''
      }).catch((err) => {
        expect(err.message).to.include('OOB_contentLength')
      })
      await getCipher('aes256').decrypt({
        key: '12312312312312313123141251231412',
        content: ''
      }).catch((err) => {
        expect(err.message).to.include('OOB_contentLength')
      })
    } catch (err) {
      expect(err.message).to.include('OOB_contentLength')
    }
  })
})
