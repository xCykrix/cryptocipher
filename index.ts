import { getCiphers, getHashes } from 'crypto'

import { CipherDriver } from './lib/driver.cipher'
import { HashingDriver } from './lib/driver.hashing'
import { superify } from './lib/super/super.cipher'

/**
 * Obtain an instance of the requested Driver.
 *
 * @remarks
 *
 * Acceptable identifiers are as follows:
 * - Any entry from crypto#getCiphers()
 * - Any entry from crypto#getHashes()
 * - diffie-hellman
 * - diffie-hellman-group
 * - ecdh
 * - hmac
 *
 * If using in TypeScript, make sure to cast the respective driver appropriately to maintain correct typings.
 *
 * @param identifier - The requested driver implementation from the list of acceptable identifiers.
 *
 * @returns The pre-configured driver implementation of the specified identifier.
 *
 * @throws Error (sec:violation:id_disabled) - If the requested identifier is disabled or unsafe to use.
 * @throws Error (sec:violation:id_missing) - If the requested identifier is missing or unavailable.
 *
 * @readonly
 * @public
 * @deprecated This function is now deprecated and will be removed in 3.2.0, fetch() will be replaced with getCipher() getHasher() and get[Feature]() effective immediately.
 */
export function fetch (identifier: string): CipherDriver | HashingDriver {
  try {
    return getCipher(identifier)
  } catch {
    try {
      return getHasher(identifier)
    } catch {
      throw new Error('sec:violation:id_missing: This identifier was not able to be found. If you believe this is a bug, please open a report at https://github.com/amethyst-studio/cryptocipher for assistance.')
    }
  }
}

/**
 * Obtain an instance of the requested CipherDriver.
 *
 * @remarks
 *
 * Accepts any supported Node.js Encryption Algorithm. You can find a list of supported algorithms with the https://nodejs.org/api/crypto.html#crypto_crypto_getciphers function.
 *
 * @param identifier - The requested CipherDriver implementation.
 *
 * @returns The pre-configured driver implementation from the requested identifier.
 *
 * @throws Error (sec:violation:id_disabled) - If the requested identifier is disabled or considered unstable.
 * @throws Error (sec:violation:id_missing)  - If the requested identifier is missing or unavailable. Please report this error to https://github.com/amethyst-studio/cryptocipher/
 *
 * @readonly
 * @public
 */
export function getCipher (identifier: string): CipherDriver {
  const disabled = superify().disabled

  // Check for Disabled
  if (disabled.includes(identifier)) {
    throw new Error('sec:violation:id_disabled: This identifier has been disabled due to security or instability concerns.')
  }

  // Check for Cipher
  if (getCiphers().includes(identifier)) {
    return new CipherDriver(identifier)
  }

  throw new Error('sec:violation:id_missing: This identifier was not able to be found. If you believe this is a bug, please open a report at https://github.com/amethyst-studio/cryptocipher for assistance.')
}

/**
 * Obtain an instance of the requested HashingDriver.
 *
 * @remarks
 *
 * Accepts any supported Node.js Hashing Algorithm. You can find a list of supported algorithms with the https://nodejs.org/api/crypto.html#crypto_crypto_gethashes function.
 *
 * @param identifier - The requested HashingDriver implementation.
 *
 * @returns The pre-configured driver implementation from the requested identifier.
 *
 * @throws Error (sec:violation:id_missing) - If the requested identifier is missing or unavailable.
 *
 * @readonly
 * @public
 */
export function getHasher (identifier: string): HashingDriver {
  // Check for Hasher
  if (getHashes().includes(identifier)) {
    return new HashingDriver(identifier)
  }

  throw new Error('sec:violation:id_missing: This identifier was not able to be found. If you believe this is a bug, please open a report at https://github.com/amethyst-studio/cryptocipher for assistance.')
}
