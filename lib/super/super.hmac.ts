export interface Superify {
  $integration: string
  disabled: string[]
}

const parentSuper: Superify = {
  $integration: 'Supported Hmac Implementations by CryptoCipher',

  disabled: [
    'shake128',
    'shake256',
  ],
};

export function superify(): Superify {
  return parentSuper;
}
