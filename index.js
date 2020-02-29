const encryptionImpl = require('./lib/encryption/implementation')
const hashingImpl = require('./lib/hashes/implementation')

function fetch (implementation) {
  return new Promise((resolve, reject) => {
    if (!implementation || implementation === '') {
      return reject(new Error('selected implementation cannot be undefined'))
    }

    // Handle old Versions of CryptoCipher
    if (implementation.indexOf('/') > -1) {
      if (implementation.indexOf('wrap') > -1) {
        implementation = implementation.replace('/wrap', '-wrap')
      } else {
        implementation = implementation.replace('aes128/', 'aes-128-')
        implementation = implementation.replace('aes192/', 'aes-192-')
        implementation = implementation.replace('aes256/', 'aes-256-')
      }
    }

    // Normalize base variants.
    if (implementation === 'aes-128') implementation = implementation.replace('aes-128', 'aes128')
    if (implementation === 'aes-192') implementation = implementation.replace('aes-192', 'aes192')
    if (implementation === 'aes-256') implementation = implementation.replace('aes-256', 'aes256')

    // Normalize Weird Formats
    if (implementation === 'aes-128-wrap') implementation = implementation.replace('aes-128-wrap', 'aes128-wrap')
    if (implementation === 'aes-192-wrap') implementation = implementation.replace('aes-192-wrap', 'aes192-wrap')
    if (implementation === 'aes-256-wrap') implementation = implementation.replace('aes-256-wrap', 'aes256-wrap')

    const selectedImplementation = fetchImplementation(implementation)
    if (selectedImplementation === undefined) {
      return reject(new Error('[impl] unsupported implementation requested'))
    }

    const executionSuite = selectedImplementation.get(implementation)

    return resolve(executionSuite)
  })
}

function fetchImplementation (implementation) {
  if (require('crypto').getCiphers().indexOf(implementation) > -1) { return encryptionImpl }
  if (require('crypto').getHashes().indexOf(implementation) > -1) { return hashingImpl }
}

module.exports.fetch = fetch
