/**
 * ENUM Types of supported Crypto Engines.
 */
function getTypes () {
  return {
    'DIFFIE-HELLMAN': 'DIFFIE-HELLMAN',
    'DIFFIE-HELLMAN-GROUP': 'DIFFIE-HELLMAN-GROUP',
    ECDH: 'ECDH',
    HMAC: 'HMAC',
    CRYPTO: 'CRYPTO',
    HASH: 'HASH'
  }
}

// Export Type
module.exports = getTypes()
