export interface Superify {
  $integration: string
  disabled: string[]
  overrides: {
    [key: string]: {
      disabled?: boolean
      ivLength: number
      keyLength: number
      tagLength: number
    }
  }
}

const parentSuper: Superify = {
  $integration: 'Supported Cipher Implementations by CryptoCipher',

  disabled: [
    'aes-128-cbc-hmac-sha1',
    'aes-128-cbc-hmac-sha256',
    'aes-256-cbc-hmac-sha1',
    'aes-256-cbc-hmac-sha256',
    'aes128-wrap',
    'aes192-wrap',
    'aes256-wrap',
    'bf',
    'bf-cbc',
    'bf-cfb',
    'bf-ecb',
    'bf-ofb',
    'blowfish',
    'cast',
    'cast-cbc',
    'cast5-cbc',
    'cast5-cfb',
    'cast5-ecb',
    'cast5-ofb',
    'des',
    'des-cbc',
    'des-cfb',
    'des-cfb1',
    'des-cfb8',
    'des-ecb',
    'des-ede',
    'des-ede-cbc',
    'des-ede-cfb',
    'des-ede-ecb',
    'des-ede-ofb',
    'des-ofb',
    'des3-wrap',
    'desx',
    'desx-cbc',
    'id-aes128-wrap',
    'id-aes192-wrap',
    'id-aes256-wrap',
    'id-smime-alg-CMS3DESwrap',
    'idea',
    'idea-cbc',
    'idea-cfb',
    'idea-ecb',
    'idea-ofb',
    'rc2',
    'rc2-128',
    'rc2-40',
    'rc2-40-cbc',
    'rc2-64',
    'rc2-64-cbc',
    'rc2-cbc',
    'rc2-cfb',
    'rc2-ecb',
    'rc2-ofb',
    'rc4',
    'rc4-40',
    'rc4-hmac-md5',
    'seed',
    'seed-cbc',
    'seed-cfb',
    'seed-ecb',
    'seed-ofb',
  ],

  overrides: {
    'aes-128-cbc': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'aes-128-ccm': {
      ivLength: 13,
      keyLength: 16,
      tagLength: 16,
    },
    'aes-128-cfb': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'aes-128-cfb1': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'aes-128-cfb8': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'aes-128-ctr': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'aes-128-ecb': {
      ivLength: 0,
      keyLength: 16,
      tagLength: 128,
    },
    'aes-128-gcm': {
      ivLength: 64,
      keyLength: 16,
      tagLength: 16,
    },
    'aes-128-ocb': {
      ivLength: 15,
      keyLength: 16,
      tagLength: 16,
    },
    'aes-128-ofb': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'aes-128-xts': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'aes-192-cbc': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'aes-192-ccm': {
      ivLength: 13,
      keyLength: 24,
      tagLength: 16,
    },
    'aes-192-cfb': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'aes-192-cfb1': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'aes-192-cfb8': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'aes-192-ctr': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'aes-192-ecb': {
      ivLength: 0,
      keyLength: 24,
      tagLength: 128,
    },
    'aes-192-gcm': {
      ivLength: 64,
      keyLength: 24,
      tagLength: 16,
    },
    'aes-192-ocb': {
      ivLength: 15,
      keyLength: 24,
      tagLength: 16,
    },
    'aes-192-ofb': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'aes-256-cbc': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'aes-256-ccm': {
      ivLength: 13,
      keyLength: 32,
      tagLength: 16,
    },
    'aes-256-cfb': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'aes-256-cfb1': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'aes-256-cfb8': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'aes-256-ctr': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'aes-256-ecb': {
      ivLength: 0,
      keyLength: 32,
      tagLength: 128,
    },
    'aes-256-gcm': {
      ivLength: 64,
      keyLength: 32,
      tagLength: 16,
    },
    'aes-256-ocb': {
      ivLength: 15,
      keyLength: 32,
      tagLength: 16,
    },
    'aes-256-ofb': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'aes-256-xts': {
      ivLength: 16,
      keyLength: 64,
      tagLength: 128,
    },
    aes128: {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    aes192: {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    aes256: {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'aria-128-cbc': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'aria-128-ccm': {
      ivLength: 13,
      keyLength: 16,
      tagLength: 16,
    },
    'aria-128-cfb': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'aria-128-cfb1': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'aria-128-cfb8': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'aria-128-ctr': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'aria-128-ecb': {
      ivLength: 0,
      keyLength: 16,
      tagLength: 128,
    },
    'aria-128-gcm': {
      ivLength: 64,
      keyLength: 16,
      tagLength: 16,
    },
    'aria-128-ofb': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'aria-192-cbc': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'aria-192-ccm': {
      ivLength: 13,
      keyLength: 24,
      tagLength: 16,
    },
    'aria-192-cfb': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'aria-192-cfb1': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'aria-192-cfb8': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'aria-192-ctr': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'aria-192-ecb': {
      ivLength: 0,
      keyLength: 24,
      tagLength: 128,
    },
    'aria-192-gcm': {
      ivLength: 64,
      keyLength: 24,
      tagLength: 16,
    },
    'aria-192-ofb': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'aria-256-cbc': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'aria-256-ccm': {
      ivLength: 13,
      keyLength: 32,
      tagLength: 16,
    },
    'aria-256-cfb': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'aria-256-cfb1': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'aria-256-cfb8': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'aria-256-ctr': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'aria-256-ecb': {
      ivLength: 0,
      keyLength: 32,
      tagLength: 128,
    },
    'aria-256-gcm': {
      ivLength: 64,
      keyLength: 32,
      tagLength: 16,
    },
    'aria-256-ofb': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    aria128: {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    aria192: {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    aria256: {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'camellia-128-cbc': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'camellia-128-cfb': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'camellia-128-cfb1': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'camellia-128-cfb8': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'camellia-128-ctr': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'camellia-128-ecb': {
      ivLength: 0,
      keyLength: 16,
      tagLength: 128,
    },
    'camellia-128-ofb': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'camellia-192-cbc': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'camellia-192-cfb': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'camellia-192-cfb1': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'camellia-192-cfb8': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'camellia-192-ctr': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'camellia-192-ecb': {
      ivLength: 0,
      keyLength: 24,
      tagLength: 128,
    },
    'camellia-192-ofb': {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    'camellia-256-cbc': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'camellia-256-cfb': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'camellia-256-cfb1': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'camellia-256-cfb8': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'camellia-256-ctr': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'camellia-256-ecb': {
      ivLength: 0,
      keyLength: 32,
      tagLength: 128,
    },
    'camellia-256-ofb': {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    camellia128: {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    camellia192: {
      ivLength: 16,
      keyLength: 24,
      tagLength: 128,
    },
    camellia256: {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },






    chacha20: {
      ivLength: 16,
      keyLength: 32,
      tagLength: 128,
    },
    'chacha20-poly1305': {
      ivLength: 12,
      keyLength: 32,
      tagLength: 16,
    },











    'des-ede3': {
      ivLength: 0,
      keyLength: 24,
      tagLength: 128,
    },
    'des-ede3-cbc': {
      ivLength: 8,
      keyLength: 24,
      tagLength: 128,
    },
    'des-ede3-cfb': {
      ivLength: 8,
      keyLength: 24,
      tagLength: 128,
    },
    'des-ede3-cfb1': {
      ivLength: 8,
      keyLength: 24,
      tagLength: 128,
    },
    'des-ede3-cfb8': {
      ivLength: 8,
      keyLength: 24,
      tagLength: 128,
    },
    'des-ede3-ecb': {
      ivLength: 0,
      keyLength: 24,
      tagLength: 128,
    },
    'des-ede3-ofb': {
      ivLength: 8,
      keyLength: 24,
      tagLength: 128,
    },
    'des-ofb': {
      ivLength: 8,
      keyLength: 8,
      tagLength: 128,
    },
    des3: {
      ivLength: 8,
      keyLength: 24,
      tagLength: 128,
    },



    'id-aes128-CCM': {
      ivLength: 13,
      keyLength: 16,
      tagLength: 16,
    },
    'id-aes128-GCM': {
      ivLength: 64,
      keyLength: 16,
      tagLength: 16,
    },
    'id-aes128-wrap': {
      ivLength: 8,
      keyLength: 16,
      tagLength: 128,
    },
    'id-aes128-wrap-pad': {
      ivLength: 4,
      keyLength: 16,
      tagLength: 128,
    },
    'id-aes192-CCM': {
      ivLength: 13,
      keyLength: 24,
      tagLength: 16,
    },
    'id-aes192-GCM': {
      ivLength: 64,
      keyLength: 24,
      tagLength: 16,
    },
    'id-aes192-wrap': {
      ivLength: 8,
      keyLength: 24,
      tagLength: 128,
    },
    'id-aes192-wrap-pad': {
      ivLength: 4,
      keyLength: 24,
      tagLength: 128,
    },
    'id-aes256-CCM': {
      ivLength: 13,
      keyLength: 32,
      tagLength: 16,
    },
    'id-aes256-GCM': {
      ivLength: 64,
      keyLength: 32,
      tagLength: 16,
    },
    'id-aes256-wrap': {
      ivLength: 8,
      keyLength: 32,
      tagLength: 128,
    },
    'id-aes256-wrap-pad': {
      ivLength: 4,
      keyLength: 32,
      tagLength: 128,
    },
























    sm4: {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'sm4-cbc': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'sm4-cfb': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'sm4-ctr': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
    'sm4-ecb': {
      ivLength: 0,
      keyLength: 16,
      tagLength: 128,
    },
    'sm4-ofb': {
      ivLength: 16,
      keyLength: 16,
      tagLength: 128,
    },
  },
};

export function superify(): Superify {
  return parentSuper;
}
