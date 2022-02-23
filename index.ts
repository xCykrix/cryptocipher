import { getCiphers, getHashes } from 'crypto';
import { disabledIdentifier, unknownIdentifier } from './lib/utils/error';
import { CipherDriver } from './lib/driver.cipher';
import { HashingDriver } from './lib/driver.hashing';
import { HmacDriver } from './lib/driver.hmac';
import { superify as cipherSuperify } from './lib/super/super.cipher';
import { superify as hashingSuperify } from './lib/super/super.hashing';
import { superify as hmacSuperify } from './lib/super/super.hmac';

/**
 * Initialize the CipherDriver instance for the selected identifier.
 *
 * @remarks
 *
 * Accepts any supported identifier from the crypto#getCiphers() function. Will generate an error on unsupported identifiers.
 * Reference: https://nodejs.org/api/crypto.html#crypto_crypto_getciphers
 * Unsupported: https://github.com/amethyst-studio/cryptocipher/blob/main/lib/super/super.cipher.ts
 *
 * @param identifier - The requested identifier.
 *
 * @returns The initialized instance of the requested identifier.
 *
 * @throws Error (sec:violation:id_disabled) - If the requested identifier is disabled or considered unstable.
 * @throws Error (sec:violation:id_unknown) - If the requested identifier is unknown or unavailable.
 *
 * @public
 */
export function getCipher(identifier: string): CipherDriver {
  const disabled = cipherSuperify().disabled;

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
 * Initialize the HashingDriver instance for the selected identifier.
 *
 * @remarks
 *
 * Accepts any supported identifier from the crypto#getHashes() function. Will generate an error on unsupported identifiers.
 * Reference: https://nodejs.org/api/crypto.html#crypto_crypto_gethashes
 * Unsupported: https://github.com/amethyst-studio/cryptocipher/blob/main/lib/super/super.hashing.ts
 *
 * @param identifier - The requested identifier.
 *
 * @returns The initialized instance of the requested identifier.
 *
 * @throws Error (sec:violation:id_unknown) - If the requested identifier is unknown or unavailable.
 *
 * @public
 */
export function getHasher(identifier: string): HashingDriver {
  const disabled = hashingSuperify().disabled;

  // Validate against the list of disabled identifiers.
  if (disabled.includes(identifier)) {
    throw disabledIdentifier(identifier);
  }

  // Validate against the list of system-available identifiers.
  if (getHashes().includes(identifier)) {
    return new HashingDriver(identifier);
  }

  // Fallback to an error if the identifier is not available.
  throw unknownIdentifier(identifier);
}

/**
 * Initialize the HmacDriver instance for the selected identifier.
 *
 * @remarks
 *
 * Accepts any supported identifier from the crypto#getHashes() function. Will generate an error on unsupported identifiers.
 * Reference: https://nodejs.org/api/crypto.html#crypto_crypto_gethashes
 *
 * @param identifier - The requested identifier.
 *
 * @returns The initialized instance of the requested identifier.
 *
 * @throws Error (sec:violation:id_disabled) - If the requested identifier is disabled or considered unstable.
 * @throws Error (sec:violation:id_unknown) - If the requested identifier is unknown or unavailable.
 *
 * @public
 */
export function getHmac(identifier: string): HmacDriver {
  const disabled = hmacSuperify().disabled;

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
