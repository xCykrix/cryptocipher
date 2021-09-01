const { expect } = require('chai')
const { getHmac } = require('../../dist/index')

describe('hmac: generate consistent integrity when provided with unacceptable states', function () {
  it('should report "id_missing" when an unknown identifier is requested', function () {
    try {
      getHmac('invalidIdentifier')
    } catch (err) {
      expect(err.message).to.include('id_missing')
    }
  })
  it('should report "OOB_contentLength" when content is empty', async function () {
    try {
      getHmac('sha256').digest({
        key: '1234',
        content: '',
        digest: 'hex'
      }).catch((err) => {
        expect(err.message).to.include('OOB_contentLength')
      })
    } catch (err) {
      expect(err.message).to.include('OOB_contentLength')
    }
  })
  it('should default to base64 encoding when invalid encoding is provided', async function () {
    const hashed = await getHmac('sha256').digest({
      key: '1234',
      content: 'hello world',
      digest: 'latin'
    })
    expect(hashed.content).to.equal('XOD+lv5JiwIfA5+KvNqMJvfzsP29ZsngUQVo33EUv+w=')
  })
})
