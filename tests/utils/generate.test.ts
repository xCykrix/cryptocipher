import { expect } from 'chai';
import { count, generate } from '../../src/utils/util';

describe('generate: (function) generates an ASCII string of the requested byte length', function () {
  it ('should accurately generate a 128 byte string', function () {
    expect(count(generate(128))).to.equal(128)
  })
  it ('should accurately generate a 512 byte string', function () {
    expect(count(generate(512))).to.equal(512)
  })
  it ('should accurately generate a 128 byte string', function () {
    expect(count(generate(225))).to.equal(225)
  })
})
