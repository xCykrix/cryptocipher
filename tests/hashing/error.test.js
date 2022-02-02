const { expect } = require('chai')
const { getHasher } = require('../../dist/index')

describe('hasher: generate consistent integrity when provided with unacceptable states', function () {
  it('should report "id_unknown" when an unknown identifier is requested', function () {
    try {
      getHasher('invalidIdentifier')
    } catch (err) {
      expect(err.message).to.include('id_unknown')
    }
  })
  it('should report "OOB_contentLength" when content is empty', async function () {
    try {
      getHasher('sha256').digest({
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
    const hashed = await getHasher('sha256').digest({
      content: 'hello world',
      digest: 'latin'
    })
    expect(hashed.content).to.equal('uU0nuZNNPgilLlLX2n2r+sSE7+N6U4DukIj3rOLvzek=')
  })
})
