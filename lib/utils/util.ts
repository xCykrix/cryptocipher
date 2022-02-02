import { randomBytes } from 'crypto';

const keys: string[] = [];
let build = false;

function init(): void {
  for (let i = 0x0020; i < 0x007f; i++) {
    if (i === 0x002F) continue;
    keys.push(String.fromCharCode(i));
  }
}

export function generate(bytes: number): string {
  if (!build) {
    init();
    build = true;
  }

  const r: string[] = [];
  while (r.length < bytes) {
    let randomByte = randomBytes(1).at(0) as number;

    // The true randomness should always be available, but fallback to pseudo-random if needed.
    if (randomBytes === undefined)
      randomByte = Math.floor(Math.random() * 255) + 1;

    const chr = keys[
      Math.floor((randomByte / 255) * (keys.length - 1))
    ] as string;
    r.push(chr);
  }
  return r.join('');
}


export function count(input: string): number {
  return Buffer.byteLength(input);
}
