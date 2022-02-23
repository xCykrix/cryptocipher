import type { BinaryToTextEncoding } from 'crypto';
import { createHash } from 'crypto';
import type { HashingContext, HashingResponse } from './types/driver.t';

/**
 * The HashingDriver class.
 *
 * @remarks
 *
 * This is a reusable class and does not need to be reinitialized between each usage. Use the getHasher function to initialize.
 */
export class HashingDriver {
  private readonly _identifier: string;

  /**
   * Wrapper around the respective Hashing algorithm based on the provided context.
   *
   * @param identifier - The identifier of the algorithm to be used.
   */
  public constructor(identifier: string) {
    this._identifier = identifier;
  }

  /**
   * Executes the respective Hashing algorithm on the provided context.
   *
   * @param context - The HashingContext to be provided to the algorithm.
   *
   * @returns - The HashingResponse wrapped in a Promise.
   *
   * @throws Error (sec:violation:OOB_contentLength) - If the user provided input is an unsafe state. Verify the input is not blank.
   */
  // trunk-ignore(eslint/@typescript-eslint/require-await)
  public async digest(context: HashingContext | undefined): Promise<HashingResponse> {
    if (context === undefined || context.content === undefined || typeof context.content !== 'string' || context.content.length < 1) {
      throw new Error(`sec:violation:OOB_contentLength: ${this._identifier} has violated the internal security policy of this package. Your content must be a string and the length must be 1 character or longer.`);
    }

    const encodings: BinaryToTextEncoding[] = ['base64', 'hex'];
    context.digest = context.digest ?? 'base64';
    if (typeof context.digest !== 'string' || !encodings.includes(context.digest)) {
      context.digest = 'base64';
    }

    const digester = createHash(this._identifier);

    digester.update(context.content);
    let digest = digester.digest(context.digest);

    if (context.iter !== undefined && context.iter > 0) {
      for (let i = 0; i < context.iter; i++) {
        const iteration = createHash(this._identifier);

        iteration.update(digest);
        digest = iteration.digest(context.digest);
      }
    }

    return {
      content: digest,
    };
  }
}
