export interface Superify {
  $integration: string
  disabled: string[]
}

const parentSuper: Superify = {
  $integration: 'Supported Hashing Implementations by CryptoCipher',

  disabled: [
    'md4',
    'md4WithRSAEncryption',
    'mdc2',
    'mdc2WithRSA',
    'ripemd',
    'ripemd160',
    'ripemd160WithRSA',
    'rmd160',
    'whirlpool',
    'RSA-MD4',
    'RSA-MDC2',
    'RSA-RIPEMD160',
    'shake128',
    'shake256',
  ],
};

export function superify(): Superify {
  return parentSuper;
}
