const types = require('./lib/utils/types')
const { IllegalInputException, UnknownImplementationException, UnsupportedImplementationException, ModuleSecurityException } = require('./lib/utils/errors')

class CryptoCipher {
  /**
   * Obtain Driver for Node.js Crypto Wrapper.
   *
   * @param {string} identifier Native Node.js Crypto module entry for wrapped engine.
   * @returns {Driver} Instance of the requested identifier's engine driver.
   */
  async fetch (identifier) {
    if (!identifier || typeof identifier !== 'string' || identifier.length === 0) {
      throw new IllegalInputException(`${identifier} could not be fetched due to the identifier being invalid. [type(string),length(>0)]`)
    }

    switch (identifier.toLowerCase()) {
      // Diffie-Hellman Standard Basic
      case 'diffie-hellman': {
        break
      }

      // Diffie-Hellman Standard w/ Groups
      case 'diffie-hellman-group': {
        break
      }

      // ECDH Standard
      case 'ecdh': {
        break
      }

      // HMAC Standard
      case 'hmac': {
        break
      }

      // Crypto and Hash Standards
      default: {
        const sup = require('./lib/driver/crypto/super.json')

        // Crypto Standard
        if (Object.keys(sup.overrides).indexOf(identifier) > -1) {
          if (sup.overrides[identifier].disabled) throw new ModuleSecurityException(`${identifier} has violated the internal security policy of this module. [IDENTIFIER:NO_UNSTABLE,CRYPTO:NO_SEGFAULT]`)
          return (await (require('./lib/drivers'))(identifier, types.CRYPTO))
        }

        // Hash Standard
        if (require('crypto').getHashes().indexOf(identifier) > -1) {
          return (await (require('./lib/drivers'))(identifier, types.HASH))
        }

        // Gather Information
        const doesNodeContainIdentifier = require('crypto').getCiphers().indexOf(identifier) > -1

        // Error on Unknown Identifier
        if (doesNodeContainIdentifier) {
          throw new UnsupportedImplementationException(`${identifier} was not found in the supported index, but it does appears to be present in theNode.js runtime. Please report this at https://github.com/amethyst-studio/cryptocipher/issues for investigation.`)
        } else {
          throw new UnknownImplementationException(`${identifier} was not found in the supported index, and does not appear to be present in the Node.js runtime. Please try migrating to a different supported alternative.`)
        }
      }
    }
  }
}

module.exports = new CryptoCipher()
