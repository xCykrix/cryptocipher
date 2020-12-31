import { createCipheriv, createDecipheriv } from 'crypto'

import { Superify, superify } from './super/super.cipher'
import { DecryptionContext, DecryptionResponse, EncryptionContext, EncryptionResponse } from './types/driver.t'
import { count, generate } from './utils/util'

/**
 * Pre-initialized Cipher Interface.
 *
 * @remarks
 *
 * This is a reusable interface and does not need to be reinitialized between each usage.
 *
 * @readonly
 * @sealed
 */
export class CipherDriver {
  private readonly _identifier: string
  private readonly _superify: Superify
  private readonly _bounds

  /**
   * Initializes the Interface with the selected identifier.
   *
   * @param identifier - The selected identifier validated before registration.
   *
   * @readonly
   */
  constructor (identifier: string) {
    this._identifier = identifier
    this._superify = superify()
    this._bounds = this._superify.overrides[this._identifier]
  }

  /**
   * Executes the respective Cipher algorithm on the provided context.
   *
   * @param context - The EncryptionContext object to be provided to the algorithm.
   *
   * @returns - The Promise<EncryptionResponse> object after processing by the algorithm.
   *
   * @throws Error (sec:violation:OOB_keyLength) - If the user provided input is in an unsafe state. Please verify the key length meets the requirements of the algorithm.
   * @throws Error (sec:violation:OOB_contentLength) - If the user provided input is an unsafe state. Please verify the input is not blank.
   *
   * @public
   * @readonly
   */
  async encrypt (context: EncryptionContext): Promise<EncryptionResponse> {
    if (context === undefined || context.key === undefined || typeof context.key !== 'string' || count(context.key) < this._bounds.keyLength || count(context.key) > this._bounds.keyLength) {
      throw new Error(`sec:violation:OOB_keyLength: ${this._identifier} has violated the internal security policy of this package. Your key length must be ${this._bounds.keyLength} characters or longer.`)
    }

    if (context === undefined || context.content === undefined || typeof context.content !== 'string' || context.content.length < 1) {
      throw new Error(`sec:violation:OOB_contentLength: ${this._identifier} has violated the internal securit policy of this package. Your content length must be 1 character or longer.`)
    }

    const convertedctx = {
      identifier: this._identifier,
      key: context.key,
      content: context.content,
      vector: generate(this._bounds.ivLength),
      aad: generate(10)
    }

    interface Optional {
      authTagLength?: number
    }
    const optional: Optional = {}

    /* istanbul ignore else */
    if (this._bounds.tagLength > -1) {
      optional.authTagLength = this._bounds.tagLength
    }

    // @ts-expect-error: I really dont know how to make this into the acceptable format of overloads, so we are just going to pretend it doesn't exist.
    const civ = createCipheriv(convertedctx.identifier, convertedctx.key, convertedctx.vector, optional)

    try {
      civ.setAAD(Buffer.from(convertedctx.aad, 'hex'), {
        plaintextLength: count(convertedctx.content)
      })
    } catch (ignored) { /* ignored */ }

    const encrypted = Buffer.concat([civ.update(convertedctx.content), civ.final()])

    const r: EncryptionResponse = {
      content: convertedctx.vector + '/' + encrypted.toString('hex'),
      aad: convertedctx.aad
    }

    try {
      r.tag = civ.getAuthTag().toString('hex')
    } catch (ignored) { /* ignored */ }

    return r
  }

  /**
   * Executes the respective Cipher algorithm on the provided context.
   *
   * @param context - The DecryptionContext object to be provided to the algorithm.
   *
   * @returns - The Promise<DecryptionResponse> object after processing by the algorithm.
   *
   * @throws Error (sec:violation:OOB_keyLength) - If the user provided input is in an unsafe state. Please verify the key length meets the requirements of the algorithm.
   * @throws Error (sec:violation:OOB_contentLength) - If the user provided input is an unsafe state. Please verify the input is not blank.
   *
   * @public
   * @readonly
   */
  async decrypt (context: DecryptionContext): Promise<DecryptionResponse> {
    if (context === undefined || context.key === undefined || typeof context.key !== 'string' || count(context.key) < this._bounds.keyLength || count(context.key) > this._bounds.keyLength) {
      throw new Error(`sec:violation:OOB_keyLength: ${this._identifier} has violated the internal security policy of this package. Your key length must be ${this._bounds.keyLength} characters or longer.`)
    }

    if (context === undefined || context.content === undefined || typeof context.content !== 'string' || context.content.length < 1) {
      throw new Error(`sec:violation:OOB_contentLength: ${this._identifier} has violated the internal security policy of this package. Your content length must be 1 character or longer.`)
    }

    const convertedctx = {
      identifier: this._identifier,
      key: context.key,
      aad: context.aad,
      tag: context.tag,
      vector: context.content.split('/')[0],
      content: Buffer.from(context.content.split('/')[1], 'hex')
    }

    interface Optional {
      authTagLength?: number
    }
    const optional: Optional = {}

    if (this._bounds.tagLength > -1) {
      optional.authTagLength = this._bounds.tagLength
    }

    // @ts-expect-error: I really don't know how to make this into the acceptable format of overloads, so we are just going to pretend it doesn't exist.
    const div = createDecipheriv(convertedctx.identifier, convertedctx.key, convertedctx.vector, optional)

    if (convertedctx.tag !== undefined) {
      div.setAuthTag(Buffer.from(convertedctx.tag, 'hex'))
    }

    if (convertedctx.aad !== undefined) {
      try {
        div.setAAD(Buffer.from(convertedctx.aad, 'hex'), {
          plaintextLength: convertedctx.content.length
        })
      } catch (ignored) { /* ignored */ }
    }

    const decrypted = Buffer.concat([div.update(convertedctx.content), div.final()])

    return {
      content: decrypted.toString()
    }
  }
}
