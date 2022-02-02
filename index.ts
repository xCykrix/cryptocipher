import { getCiphers, getHashes } from 'crypto';
import { disabledIdentifier, unknownIdentifier } from 'lib/utils/error';
import { CipherDriver } from './lib/driver.cipher';
import { HashingDriver } from './lib/driver.hashing';
import { HmacDriver } from './lib/driver.hmac';
import { superify as cipher_superify } from './lib/super/super.cipher';
import { superify as hmac_superify } from './lib/super/super.hmac';

/**
 * Obtain an instance of the requested CipherDriver.
 *
 * @remarks
 *
 * Should accept any supported identifier from the crypto#getCiphers() function.
 * Reference: https://nodejs.org/api/crypto.html#crypto_crypto_getciphers
 *
 * @param identifier - The requested implementation.
 *
 * @returns The pre-configured implementation from the requested identifier.
 *
 * @throws Error (sec:violation:id_disabled) - If the requested identifier is disabled or considered unstable.
 * @throws Error (sec:violation:id_unknown) - If the requested identifier is unknown or unavailable.
 *
 * @public
 */
export function getCipher(identifier: string): CipherDriver {
  const disabled = cipher_superify().disabled;

  // Validate against the list of disabled identifiers.
  if (disabled.includes(identifier)) {
    throw disabledIdentifier(identifier);
  }

  // Validate against the list of system-available identifiers.
  if (getCiphers().includes(identifier)) {
    return new CipherDriver(identifier);
  }

  // Fallback to an error if the identifier is not available.
  throw unknownIdentifier(identifier);
}

/**
 * Obtain an instance of the requested HashingDriver.
 *
 * @remarks
 *
 * Should accept any supported identifier from the crypto#getHashes() function.
 * Reference: https://nodejs.org/api/crypto.html#crypto_crypto_gethashes
 *
 * @param identifier - The requested implementation.
 *
 * @returns The pre-configured implementation from the requested identifier.
 *
 * @throws Error (sec:violation:id_unknown) - If the requested identifier is unknown or unavailable.
 *
 * @public
 */
export function getHasher(identifier: string): HashingDriver {
  // Validate against the list of system-available identifiers.
  if (getHashes().includes(identifier)) {
    return new HashingDriver(identifier);
  }

  // Fallback to an error if the identifier is not available.
  throw unknownIdentifier(identifier);
}

/**
 * Obtain an instance of the requested HmacDriver.
 *
 * @remarks
 *
 * Should accept any supported identifier from the crypto#getHashes() function.
 * Reference: https://nodejs.org/api/crypto.html#crypto_crypto_gethashes
 *
 * @param identifier - The requested implementation.
 *
 * @returns The pre-configured implementation from the requested identifier.
 *
 * @throws Error (sec:violation:id_disabled) - If the requested identifier is disabled or considered unstable.
 * @throws Error (sec:violation:id_unknown) - If the requested identifier is unknown or unavailable.
 *
 * @public
 */
export function getHmac(identifier: string): HmacDriver {
  const disabled = hmac_superify().disabled;

  // Validate against the list of disabled identifiers.
  if (disabled.includes(identifier)) {
    throw disabledIdentifier(identifier);
  }

  // Validate against the list of system-available identifiers.
  if (getHashes().includes(identifier)) {
    return new HmacDriver(identifier);
  }

  // Fallback to an error if the identifier is not available.
  throw unknownIdentifier(identifier);
}
