import { randomBytes } from 'crypto'

const keys: string[] = []
let build = false

function init (): void {
  for (let i = 0x0020; i < 0x007f; i++) {
    if (i === 0x002F) continue
    keys.push(String.fromCharCode(i))
  }
}

export function generate (bytes: number): string {
  if (!build) {
    init()
    build = true
  }

  let r = ''
  while (r.length < bytes) {
    const chr = keys[Math.floor((randomBytes(1)[0] / 255) * (keys.length - 1))]
    r = r + chr
  }
  return r
}

export function count (input: string): number {
  return Buffer.byteLength(input)
}
