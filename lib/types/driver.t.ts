import type { BinaryToTextEncoding } from 'crypto';

/**
 * EncryptionContext Interface Definition
 *
 * @remarks
 *
 * The secret key is in BYTES. You can use unicode or other characters in place as long as it adds up to the correct byte length.
 *
 * @param key - The secret key of an absolute byte length.
 * @param content - The content to be encrypted with the respective algorithm. This must be converted to a string for sanity sake.
 */
export interface EncryptionContext {
  content: string | undefined
  key: string | undefined
}

/**
 * DecryptionContext Interface Definition
 *
 * @remarks
 *
 * The secret key is in BYTES. You can use unicode or other characters in place as long as it adds up to the correct byte length.
 *
 * @param key - The secret key of an absolute byte length, determined by your selected algorithm.
 * @param content - The content to be encrypted with the respective algorithm. This must be converted to a string for sanity sake.
 * @param aad - (OPTIONAL) The Additional Authentication Data to be passed for decryption. This is only provided by the EncryptionResponse if it is used and is handled automagically.
 * @param tag - (OPTIONAL) The Authentication Tag to be passed for decryption. This is only provided by the EncryptionResponse if it is used and is handled automagically.
 */
export interface DecryptionContext {
  key: string | undefined
  content: string | undefined
  aad?: string
  tag?: string
}

/**
 * HashingContext Interface Definition
 *
 * @remarks
 *
 * Hashing is ONE WAY. If you hash something, you are never getting it back in rational means.
 *
 * Use this for passwords or secure information. User's security questions would be an example.
 *
 * If using for passwords... use the iter option to recursively hash the content multiple times. Use a strong hashing method such as 'sha512-256' or similar.
 * If using this for secure information... try to generalize the information before the initial hashing. You can apply simplifications and internal methods to both secure but also make users less likely to struggle with exact capitalization and punctuation of their secure information.
 *
 * @param content - The content to be hashed with the respective algorithm. This must be converted to a string for sanity sake.
 * @param digest - The BinaryToTextEncoding type you wish to use as the digestion encoding. 'hex', 'base64', or 'latin1' are the accepted inputs.
 * @param iter - [optional] The number of self iterations
 */
export interface HashingContext {
  content: string | undefined
  digest: BinaryToTextEncoding | undefined | null
  iter?: number
}

export interface HmacContext {
  key: string | undefined
  content: string | undefined
  digest: BinaryToTextEncoding | undefined | null
  iter?: number
}

/**
 * EncryptionResponse Interface Definition
 *
 * @param content - The encrypted content to be stored in your preferred database or file system.
 * @param aad - [optional] The Additional Authentication Data to be stored with the content. This is required for decryption, if present.
 * @param tag - [optional] The Authentication Tag to be stored with the content. This is required for decryption, if present.
 */
export interface EncryptionResponse {
  content: string
  aad?: string
  tag?: string
}

/**
 * DecryptionResponse Interface Definition
 *
 * @param content - The plain text content originally encrypted.
 */
export interface DecryptionResponse {
  content: string
}

/**
 * HashingResponse Interface Definition
 *
 * @param content - The hashed digest of the provided input content.
 */
export interface HashingResponse {
  content: string
}
