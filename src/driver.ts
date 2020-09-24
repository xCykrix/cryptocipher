import { getCiphers, getHashes } from 'crypto'
import { CipherDriver } from './driver.cipher'
import { HashingDriver } from './driver.hashing'
import { superify } from './super/super.cipher'

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
 * @returns The preconfigured driver implementation of the specified identifier.
 *
 * @throws Error (sec:violation) - If the requested identifier is disabled or unsafe to use.
 * @throws Error (sec:violation) - If the requested identifier is missing or unavailable.
 *
 * @readonly
 * @public
 */
export function fetch (identifier: string): CipherDriver | HashingDriver {
  const disabled = superify().disabled

  // Check for Disabled
  if (disabled.includes(identifier)) {
    throw new Error('sec:violation:id_disabled: This identifier has been disabled due to security or instability concerns.')
  }

  // Check for Cipher
  if (getCiphers().includes(identifier)) {
    return new CipherDriver(identifier)
  }

  // Check for Hashing
  if (getHashes().includes(identifier)) {
    return new HashingDriver(identifier)
  }

  throw new Error('sec:violation:id_missing: This identifier was not able to be found. If you believe this is a bug, please open a report at https://github.com/amethyst-studio/cryptocipher for assistance.')
}