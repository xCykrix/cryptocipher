import type { BinaryToTextEncoding } from 'crypto';
import { createHmac } from 'crypto';
import type { HashingResponse, HmacContext } from './types/driver.t';

/**
 * Pre-initialized Hmac Interface.
 *
 * @remarks
 *
 * This is a reusable interface and does not need to be reinitialized between each usage.
 *
 * @readonly
 * @sealed
 */
export class HmacDriver {
  private readonly _identifier: string;

  /**
   * Initializes the Interface with the selected identifier.
   *
   * @param identifier - The selected identifier validated before registration.
   *
   * @readonly
   */
  public constructor(identifier: string) {
    this._identifier = identifier;
  }

  /**
   * Executes the respective Hashing algorithm on the provided context.
   *
   * @param context - The HashingContext object to be provided to the algorithm.
   *
   * @returns - The Promise<HashingResponse> object after processing by the algorithm.
   *
   * @throws Error (sec:violation:OOB_contentLength) - If the user provided input is an unsafe state. Please verify the input is not blank.
   *
   * @public
   * @readonly
   */
  // trunk-ignore(eslint/@typescript-eslint/require-await)
  public async digest(context: HmacContext | undefined): Promise<HashingResponse> {
    if (context === undefined || context.key === undefined) {
      throw new Error(`sec:violation:OOB_keyLength: ${this._identifier} has violated the internal security policy of this package. Your key must be a string and the length must be 1 character or longer.`);
    }

    if (context.content === undefined || typeof context.content !== 'string' || context.content.length < 1) {
      throw new Error(`sec:violation:OOB_contentLength: ${this._identifier} has violated the internal security policy of this package. Your content must be a string and the length must be 1 character or longer.`);
    }

    const encodings: BinaryToTextEncoding[] = ['base64', 'hex'];
    context.digest = context.digest ?? 'base64';
    if (typeof context.digest !== 'string' || !encodings.includes(context.digest)) {
      context.digest = 'base64';
    }

    const digester = createHmac(this._identifier, context.key);

    digester.update(context.content);
    let digest = digester.digest(context.digest);

    if (context.iter !== undefined && context.iter > 0) {
      for (let i = 0; i < context.iter; i++) {
        const iteration = createHmac(this._identifier, context.key);

        iteration.update(digest);
        digest = iteration.digest(context.digest);
      }
    }

    return {
      content: digest,
    };
  }
}
