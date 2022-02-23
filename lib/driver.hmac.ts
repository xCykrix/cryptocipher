import type { BinaryToTextEncoding } from 'crypto';
import { createHmac } from 'crypto';
import type { HashingResponse, HmacContext } from './types/driver.t';

/**
 * The HmacDriver class.
 *
 * @remarks
 *
 * This is a reusable class and does not need to be reinitialized between each usage. Use the getHmac function to initialize.
 *
 * @readonly
 * @sealed
 */
export class HmacDriver {
  private readonly _identifier: string;

  /**
   * Wrapper around the respective Hashing HMAC algorithm based on the provided context.
   *
   * @param identifier - The identifier of the algorithm to be used.
   */
  public constructor(identifier: string) {
    this._identifier = identifier;
  }

  /**
   * Executes the respective Hashing HMAC algorithm on the provided context.
   *
   * @param context - The HmacContext to be provided to the algorithm.
   *
   * @returns - The HashingResponse wrapped in a Promise.
   *
   * @throws Error (sec:violation:OOB_contentLength) - If the user provided input is an unsafe state. Verify the input is not blank.
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
