/* eslint-disable @typescript-eslint/member-ordering */
import { createCipheriv, createDecipheriv } from 'crypto'
import type { Superify } from './super/super.cipher'
import { superify } from './super/super.cipher'
import type { DecryptionContext, DecryptionResponse, EncryptionContext, EncryptionResponse } from './types/driver.t'
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
  private readonly _bounds
  private readonly _identifier: string
  private readonly _superify: Superify

  /**
   * Initializes the Interface with the selected identifier.
   *
   * @param identifier - The selected identifier validated before registration.
   *
   * @readonly
   */
  public constructor (identifier: string) {
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
  public async encrypt (context: EncryptionContext | undefined): Promise<EncryptionResponse> {
    if (context === undefined || context.key === undefined || typeof context.key !== 'string' || count(context.key) < this._bounds.keyLength || count(context.key) > this._bounds.keyLength) {
      throw new Error(`sec:violation:OOB_keyLength: ${this._identifier} has violated the internal security policy of this package. Your key length must be ${this._bounds.keyLength} characters or longer.`)
    }

    if (context.content === undefined || typeof context.content !== 'string' || context.content.length < 1) {
      throw new Error(`sec:violation:OOB_contentLength: ${this._identifier} has violated the internal securit policy of this package. Your content length must be 1 character or longer.`)
    }

    const convertedCtx = {
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
    const civ = createCipheriv(convertedCtx.identifier, convertedCtx.key, convertedCtx.vector, optional)

    try {
      civ.setAAD(Buffer.from(convertedCtx.aad, 'hex'), {
        plaintextLength: count(convertedCtx.content)
      })
    } catch { /* ignored */ }

    const encrypted = Buffer.concat([civ.update(convertedCtx.content), civ.final()])

    const r: EncryptionResponse = {
      content: convertedCtx.vector + '/' + encrypted.toString('hex'),
      aad: convertedCtx.aad
    }

    try {
      r.tag = civ.getAuthTag().toString('hex')
    } catch { /* ignored */ }

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
  public async decrypt (context: DecryptionContext | undefined): Promise<DecryptionResponse> {
    if (context === undefined || context.key === undefined || typeof context.key !== 'string' || count(context.key) < this._bounds.keyLength || count(context.key) > this._bounds.keyLength) {
      throw new Error(`sec:violation:OOB_keyLength: ${this._identifier} has violated the internal security policy of this package. Your key length must be ${this._bounds.keyLength} characters or longer.`)
    }

    if (context.content === undefined || typeof context.content !== 'string' || context.content.length < 1) {
      throw new Error(`sec:violation:OOB_contentLength: ${this._identifier} has violated the internal security policy of this package. Your content length must be 1 character or longer.`)
    }

    const convertedCtx = {
      identifier: this._identifier,
      key: context.key,
      aad: context.aad,
      tag: context.tag,
      vector: context.content.split('/')[0],
      content: Buffer.from(context.content.split('/')[1], 'hex')
    }

    const optional: {
      authTagLength?: number
    } = {}

    if (this._bounds.tagLength > -1) {
      optional.authTagLength = this._bounds.tagLength
    }

    // @ts-expect-error: I really don't know how to make this into the acceptable format of overloads, so we are just going to pretend it doesn't exist.
    const div = createDecipheriv(convertedCtx.identifier, convertedCtx.key, convertedCtx.vector, optional)

    if (convertedCtx.tag !== undefined) {
      div.setAuthTag(Buffer.from(convertedCtx.tag, 'hex'))
    }

    if (convertedCtx.aad !== undefined) {
      try {
        div.setAAD(Buffer.from(convertedCtx.aad, 'hex'), {
          plaintextLength: convertedCtx.content.length
        })
      } catch { /* ignored */ }
    }

    const decrypted = Buffer.concat([div.update(convertedCtx.content), div.final()])

    return {
      content: decrypted.toString()
    }
  }
}
