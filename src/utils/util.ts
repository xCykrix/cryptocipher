import { randomBytes } from 'crypto'

export function generate (bytes: number): string {
  // const char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890!";#$%&\'()*+,-./:;<=>?@[]^_`{|}~'.split('')
  const char = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'

  let generated = ''
  while (generated.length < bytes) {
    const prng = randomBytes(1)[0] / 255
    const gChar = char[Math.floor(prng * char.length)]
    generated = generated + gChar
  }
  return generated
}

export function count (input: string): number {
  return Buffer.byteLength(input)
}
