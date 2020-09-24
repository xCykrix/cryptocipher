import { createHash, HexBase64Latin1Encoding } from 'crypto'
import { HashingContext, HashingResponse } from './types/driver'

/**
 * Preinitialized Hashing Interface.
 *
 * @remarks
 *
 * This is a reusable interface and does not need to be reinitialized between each usage.
 *
 * @readonly
 * @sealed
 */
export class HashingDriver {
  private readonly _identifier: string

  /**
   * Initializes the Interface with the selected identifier.
   *
   * @param identifier - The selected identifier validated before registration.
   *
   * @readonly
   */
  constructor (identifier: string) {
    this._identifier = identifier
  }

  /**
   * Executes the respective Hashing algoritm on the provided context.
   *
   * @param context - The HashingContext object to be provided to the algorithm.
   *
   * @returns - The Promise<HashingResponse> object after processing by the algorithm.
   *
   * @throws Error (sec:violation) - If the user provided input is an unsafe state. Please verify any input that states 'Your X length is Y' to the applicable values.
   *
   * @public
   * @readonly
   */
  async digest (context: HashingContext): Promise<HashingResponse> {
    if (typeof context?.content !== 'string' || context?.content?.length < 1) {
      throw new Error(`sec:violation:OOB_content: ${this._identifier} has violated the internal securit policy of this package. Your content length must be 1 character or longer.`)
    }

    const encodings: HexBase64Latin1Encoding[] = ['latin1', 'base64', 'hex']
    if (typeof context?.digest !== 'string' || !encodings.includes(context.digest)) {
      context.digest = 'base64'
    }

    const civ = createHash(this._identifier)

    civ.update(context.content)
    let digest = civ.digest(context.digest)

    if (context?.iter !== undefined && context?.iter > 0) {
      context.content = digest
      context.iter = context.iter - 1
      const r = await this.digest(context)
      digest = r.content
    }

    return {
      content: digest
    }
  }
}
