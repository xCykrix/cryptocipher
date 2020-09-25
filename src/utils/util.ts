export function generate (bytes: number): string {
  const char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890!*_-+=@#$%^&?[]{}'.split('')

  let generated = ''
  while (generated.length < bytes) {
    const gChar = char[Math.floor(Math.random() * char.length)]
    generated = generated + gChar
  }
  return generated
}

export function count (input: string): number {
  return Buffer.byteLength(input)
}
