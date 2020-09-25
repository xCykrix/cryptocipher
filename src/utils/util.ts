import { randomBytes } from 'crypto'

export function generate (bytes: number): string {
  const char = '!"#$%&\'()*+,-.0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'.split('')

  let generated = ''
  while (generated.length < bytes) {
    const prng = randomBytes(1)[0] / 255
    const gChar = char[Math.floor(prng * (char.length - 1))]
    generated = generated + gChar
  }
  return generated
}

export function count (input: string): number {
  return Buffer.byteLength(input)
}
