import { expect } from 'chai';
import { fetch } from '../../src/driver';

describe('fetch: (function, runtime, EOL DEPRECATED) generates a cipher or hasher implementation', function () {
  it('should correctly return a cipher', function () {
    expect(fetch('aes128')).to.not.equal(undefined)
  })
  it ('should correctly return a hasher', function () {
    expect(fetch('sha1')).to.not.equal(undefined)
  })
  it ('should report "id_missing" when an unknown identifier is requested', function () {
    try {
      fetch('invalidIdentifier')
    } catch (err) {
      expect(err.message).to.include('id_missing')
    }
  })
})
