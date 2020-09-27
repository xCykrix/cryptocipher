import { expect } from 'chai';
import { getHashes } from 'crypto';
import { getHasher } from '../../src/driver';

describe('hasher: (error) the hasher runtime builder should error when in these states', function () {
  it ('should report "id_missing" when an unknown identifier is requested', function () {
    try {
      getHasher('invalidIdentifier')
    } catch (err) {
      expect(err.message).to.include('id_missing')
    }
  })
  it ('should report "OOB_contentLength" when content is empty', async function () {
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
})
