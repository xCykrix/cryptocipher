import { getHashes } from 'crypto';
import { fetch } from '../src/driver';
import { HashingDriver } from '../src/driver.hashing';
import { generate } from '../src/utils/util';

describe('Crypto#getHashes: Testing integrity of all provided algorithms.', function () {
  for (const identifier of getHashes()) {
    it (`${identifier}: should not fail single hashing cycle (1)`, async function () {
      for (let index = 0; index < 5; index++) {
        const driver = <HashingDriver> fetch(identifier)
        await driver.digest({
          content: generate(1024),
          digest: 'hex'
        })
      }
    })
    it (`${identifier}: should not fail multiple hashing cycle (2048)`, async function () {
      for (let index = 0; index < 5; index++) {
        const driver = <HashingDriver> fetch(identifier)
        await driver.digest({
          content: generate(1024),
          digest: 'hex',
          iter: 1024
        })
      }
    })
  }
})
