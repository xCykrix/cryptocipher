import { expect } from 'chai';
import { getCiphers } from 'crypto';
import { getCipher } from '../src/driver';
import { superify } from '../src/super/super.cipher';
import { DecryptionContext, EncryptionContext } from '../src/types/driver';
import { generate } from '../src/utils/util';

describe('Crypto#getCiphers: Testing integrity of all provided algorithms.', function () {
  for (const identifier of getCiphers()) {
    it (`${identifier}: should not fail encryption and decryption cycle`, async function () {
      for (let index = 0; index < 5; index++) {
        const bounds = superify().overrides[identifier]

        if (!bounds) throw new chai.AssertionError(`${identifier}: missing from master entries table`)
        if (bounds.disabled) this.skip()
        else {
          const t: EncryptionContext = {
            key: generate(bounds.keyLength),
            content: generate(2048)
          }

          const driver = getCipher(identifier)
          const encrypt = await driver.encrypt(t)
          const d: DecryptionContext = {
            key: t.key,
            content: encrypt.content
          }
          if (encrypt.aad) d.aad = encrypt.aad
          if (encrypt.tag) d.tag = encrypt.tag
          const decrypt = await driver.decrypt(d)

          expect(t.content).to.equal(decrypt.content)
        }
      }
    })
  }
})
