const { expect } = require('chai')

const { fetch } = require('../../dist')

describe('fetch: | @deprecated-api | generates a cipher or hasher implementation before single object context impl', function () {
  it('should correctly return a cipher interface', function () {
    expect(fetch('aes128')).to.not.equal(undefined)
  })
  it('should correctly return a hash interface', function () {
    expect(fetch('sha1')).to.not.equal(undefined)
  })
  it('should report "id_missing" when an unknown identifier is requested', function () {
    try {
      fetch('invalidIdentifier')
    } catch (err) {
      expect(err.message).to.include('id_missing')
    }
  })
})
