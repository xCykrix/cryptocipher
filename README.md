# node-cryptocipher

-------

## Installation

```sh
npm install cryptocipher@latest # release versions
npm install cryptocipher@next # development versions
```

### Usage

#### Encryption Engines

```js
const cryptocipher = require('cryptocipher')
cryptocipher.fetch('aes-128-cfb8').then((engine) => {
  engine.encrypt('hello world', '1231231231231231').then((encryptedData) => {
    console.info(encryptedData)
    /* encryptedData = {
      suite: 'aes-128-cfb8', <-- selected suite
      key: '1231231231231231', <-- 16 byte key, as per below
      data: 'ey=xyLht+!6}_=Z$/025c73f3fdaf4f4bc076da', <-- encoded data
      aad: 'jV=AM06m?Q' <-- not always required in decryption, only certain ciphers require this
    } */
    engine.decrypt(encryptedData.data, '1231231231231231').then((decryptedData) => {
      console.info(decryptedData)
      /* decryptedData = {
        suite: 'aes-128-cfb8',
        key: '1231231231231231',
        data: 'hello world'
      } */
    })
  })
})
```

**Note** : Certain responses return `encryptedData.tag`, this is always required in the decryption action. All responses will return `encryptedData.aad`, however it is not always required in the decryption action.

#### Hashing Engines

```js
const cryptocipher = require('cryptocipher')
cryptocipher.fetch('sha512-256').then((engine) => {
  engine.digest('hello world').then((hashedData) => {
    console.info(hashedData)
    /* hashedData = {
      suite: 'sha512-256',
      digest: 'base64',
      data: 'CsVh+sg4EE4/LkrRB7S+4+k4vxXysV8AnMzNYakT8Bc='
    } */
  })
})
```

### Supported Hashing

You can find available hashes by using `require('crypto').getHashes()`.

### Supported Ciphers

You can find the supported ciphers and information on them below, `keyLength` will be the length of
  your secret key in **bytes**.

```json
{
  "aes-128-cbc": { "keyLength": 16, "ivLength": 16 },
  "aes-128-ccm": { "keyLength": 16, "tagLength": 16, "ivLength": 12 },
  "aes-128-cfb": { "keyLength": 16, "ivLength": 16 },
  "aes-128-cfb1": { "keyLength": 16, "ivLength": 16 },
  "aes-128-cfb8": { "keyLength": 16, "ivLength": 16 },
  "aes-128-ctr": { "keyLength": 16, "ivLength": 16 },
  "aes-128-ecb": { "keyLength": 16, "ivLength": 0 },
  "aes-128-gcm": { "keyLength": 16, "ivLength": 16 },
  "aes-128-ocb": { "keyLength": 16, "tagLength": 16, "ivLength": 12 },
  "aes-128-ofb": { "keyLength": 16, "ivLength": 16 },
  "aes-128-xts": { "keyLength": 32, "ivLength": 16 },
  "aes-192-cbc": { "keyLength": 24, "ivLength": 16 },
  "aes-192-ccm": { "keyLength": 24, "tagLength": 16, "ivLength": 12 },
  "aes-192-cfb": { "keyLength": 24, "ivLength": 16 },
  "aes-192-cfb1": { "keyLength": 24, "ivLength": 16 },
  "aes-192-cfb8": { "keyLength": 24, "ivLength": 16 },
  "aes-192-ctr": { "keyLength": 24, "ivLength": 16 },
  "aes-192-ecb": { "keyLength": 24, "ivLength": 0 },
  "aes-192-gcm": { "keyLength": 24, "ivLength": 16 },
  "aes-192-ocb": { "keyLength": 24, "tagLength": 16, "ivLength": 12 },
  "aes-192-ofb": { "keyLength": 24, "ivLength": 16 },
  "aes-256-cbc": { "keyLength": 32, "ivLength": 16 },
  "aes-256-ccm": { "keyLength": 32, "tagLength": 16, "ivLength": 12 },
  "aes-256-cfb": { "keyLength": 32, "ivLength": 16 },
  "aes-256-cfb1": { "keyLength": 32, "ivLength": 16 },
  "aes-256-cfb8": { "keyLength": 32, "ivLength": 16 },
  "aes-256-ctr": { "keyLength": 32, "ivLength": 16 },
  "aes-256-ecb": { "keyLength": 32, "ivLength": 0 },
  "aes-256-gcm": { "keyLength": 32, "ivLength": 16 },
  "aes-256-ocb": { "keyLength": 32, "tagLength": 16, "ivLength": 12 },
  "aes-256-ofb": { "keyLength": 32, "ivLength": 16 },
  "aes-256-xts": { "keyLength": 64, "ivLength": 16 },
  "aes-128": { "keyLength": 16, "ivLength": 16 },
  "aes128-wrap": { "keyLength": 16, "ivLength": 8 },
  "aes-192": { "keyLength": 24, "ivLength": 16 },
  "aes192-wrap": { "keyLength": 24, "ivLength": 8 },
  "aes-256": { "keyLength": 32, "ivLength": 16 },
  "aes256-wrap": { "keyLength": 32, "ivLength": 8 },
  "aria-128-cbc": { "keyLength": 16, "ivLength": 16 },
  "aria-128-ccm": { "keyLength": 16, "tagLength": 16, "ivLength": 12 },
  "aria-128-cfb": { "keyLength": 16, "ivLength": 16 },
  "aria-128-cfb1": { "keyLength": 16, "ivLength": 16 },
  "aria-128-cfb8": { "keyLength": 16, "ivLength": 16 },
  "aria-128-ctr": { "keyLength": 16, "ivLength": 16 },
  "aria-128-ecb": { "keyLength": 16, "ivLength": 0 },
  "aria-128-gcm": { "keyLength": 16, "ivLength": 16 },
  "aria-128-ofb": { "keyLength": 16, "ivLength": 16 },
  "aria-192-cbc": { "keyLength": 24, "ivLength": 16 },
  "aria-192-ccm": { "keyLength": 24, "tagLength": 16, "ivLength": 12 },
  "aria-192-cfb": { "keyLength": 24, "ivLength": 16 },
  "aria-192-cfb1": { "keyLength": 24, "ivLength": 16 },
  "aria-192-cfb8": { "keyLength": 24, "ivLength": 16 },
  "aria-192-ctr": { "keyLength": 24, "ivLength": 16 },
  "aria-192-ecb": { "keyLength": 24, "ivLength": 0 },
  "aria-192-gcm": { "keyLength": 24, "ivLength": 16 },
  "aria-192-ofb": { "keyLength": 24, "ivLength": 16 },
  "aria-256-cbc": { "keyLength": 32, "ivLength": 16 },
  "aria-256-ccm": { "keyLength": 32, "tagLength": 16, "ivLength": 12 },
  "aria-256-cfb": { "keyLength": 32, "ivLength": 16 },
  "aria-256-cfb1": { "keyLength": 32, "ivLength": 16 },
  "aria-256-cfb8": { "keyLength": 32, "ivLength": 16 },
  "aria-256-ctr": { "keyLength": 32, "ivLength": 16 },
  "aria-256-ecb": { "keyLength": 32, "ivLength": 0 },
  "aria-256-gcm": { "keyLength": 32, "ivLength": 16 },
  "aria-256-ofb": { "keyLength": 32, "ivLength": 16 },
  "aria128": { "keyLength": 16, "ivLength": 16 },
  "aria192": { "keyLength": 24, "ivLength": 16 },
  "aria256": { "keyLength": 32, "ivLength": 16 },
  "bf": { "keyLength": 56, "ivLength": 8 },
  "bf-cbc": { "keyLength": 56, "ivLength": 8 },
  "bf-cfb": { "keyLength": 56, "ivLength": 8 },
  "bf-ecb": { "keyLength": 56, "ivLength": 0 },
  "bf-ofb": { "keyLength": 56, "ivLength": 8 },
  "blowfish": { "keyLength": 56, "ivLength": 8 },
  "camellia-128-cbc": { "keyLength": 16, "ivLength": 16 },
  "camellia-128-cfb": { "keyLength": 16, "ivLength": 16 },
  "camellia-128-cfb1": { "keyLength": 16, "ivLength": 16 },
  "camellia-128-cfb8": { "keyLength": 16, "ivLength": 16 },
  "camellia-128-ctr": { "keyLength": 16, "ivLength": 16 },
  "camellia-128-ecb": { "keyLength": 16, "ivLength": 0 },
  "camellia-128-ofb": { "keyLength": 16, "ivLength": 16 },
  "camellia-192-cbc": { "keyLength": 24, "ivLength": 16 },
  "camellia-192-cfb": { "keyLength": 24, "ivLength": 16 },
  "camellia-192-cfb1": { "keyLength": 24, "ivLength": 16 },
  "camellia-192-cfb8": { "keyLength": 24, "ivLength": 16 },
  "camellia-192-ctr": { "keyLength": 24, "ivLength": 16 },
  "camellia-192-ecb": { "keyLength": 24, "ivLength": 0 },
  "camellia-192-ofb": { "keyLength": 24, "ivLength": 16 },
  "camellia-256-cbc": { "keyLength": 32, "ivLength": 16 },
  "camellia-256-cfb": { "keyLength": 32, "ivLength": 16 },
  "camellia-256-cfb1": { "keyLength": 32, "ivLength": 16 },
  "camellia-256-cfb8": { "keyLength": 32, "ivLength": 16 },
  "camellia-256-ctr": { "keyLength": 32, "ivLength": 16 },
  "camellia-256-ecb": { "keyLength": 32, "ivLength": 0 },
  "camellia-256-ofb": { "keyLength": 32, "ivLength": 16 },
  "camellia128": { "keyLength": 16, "ivLength": 16 },
  "camellia192": { "keyLength": 24, "ivLength": 16 },
  "camellia256": { "keyLength": 32, "ivLength": 16 },
  "cast": { "keyLength": 16, "ivLength": 8 },
  "cast-cbc": { "keyLength": 16, "ivLength": 8 },
  "cast5-cbc": { "keyLength": 16, "ivLength": 8 },
  "cast5-cfb": { "keyLength": 16, "ivLength": 8 },
  "cast5-ecb": { "keyLength": 16, "ivLength": 0 },
  "cast5-ofb": { "keyLength": 16, "ivLength": 8 },
  "chacha20": { "keyLength": 32, "ivLength": 16 },
  "chacha20-poly1305": { "keyLength": 32, "tagLength": 12, "ivLength": 8 },
  "des": { "keyLength": 8, "ivLength": 8 },
  "des-cbc": { "keyLength": 8, "ivLength": 8 },
  "des-cfb": { "keyLength": 8, "ivLength": 8 },
  "des-cfb1": { "keyLength": 8, "ivLength": 8 },
  "des-cfb8": { "keyLength": 8, "ivLength": 8 },
  "des-ecb": { "keyLength": 8, "ivLength": 0 },
  "des-ede": { "keyLength": 16, "ivLength": 0 },
  "des-ede-cbc": { "keyLength": 16, "ivLength": 8 },
  "des-ede-cfb": { "keyLength": 16, "ivLength": 8 },
  "des-ede-ecb": { "keyLength": 16, "ivLength": 0 },
  "des-ede-ofb": { "keyLength": 16, "ivLength": 8 },
  "des-ede3": { "keyLength": 24, "ivLength": 0 },
  "des-ede3-cbc": { "keyLength": 24, "ivLength": 8 },
  "des-ede3-cfb": { "keyLength": 24, "ivLength": 8 },
  "des-ede3-cfb1": { "keyLength": 24, "ivLength": 8 },
  "des-ede3-cfb8": { "keyLength": 24, "ivLength": 8 },
  "des-ede3-ecb": { "keyLength": 24, "ivLength": 0 },
  "des-ede3-ofb": { "keyLength": 24, "ivLength": 8 },
  "des-ofb": { "keyLength": 8, "ivLength": 8 },
  "des3": { "keyLength": 24, "ivLength": 8 },
  "des3-wrap": { "keyLength": 24, "ivLength": 0 },
  "desx": { "keyLength": 24, "ivLength": 8 },
  "desx-cbc": { "keyLength": 24, "ivLength": 8 },
  "id-aes128-CCM": { "keyLength": 16, "tagLength": 16, "ivLength": 12 },
  "id-aes128-GCM": { "keyLength": 16, "ivLength": 16 },
  "id-aes128-wrap": { "keyLength": 16, "ivLength": 8 },
  "id-aes128-wrap-pad": { "keyLength": 16, "ivLength": 4 },
  "id-aes192-CCM": { "keyLength": 24, "tagLength": 16, "ivLength": 12 },
  "id-aes192-GCM": { "keyLength": 24, "ivLength": 16 },
  "id-aes192-wrap": { "keyLength": 24, "ivLength": 8 },
  "id-aes192-wrap-pad": { "keyLength": 24, "ivLength": 4 },
  "id-aes256-CCM": { "keyLength": 32, "tagLength": 16, "ivLength": 12 },
  "id-aes256-GCM": { "keyLength": 32, "ivLength": 16 },
  "id-aes256-wrap": { "keyLength": 32, "ivLength": 8 },
  "id-aes256-wrap-pad": { "keyLength": 32, "ivLength": 4 },
  "id-smime-alg-CMS3DESwrap": { "keyLength": 24, "ivLength": 0 },
  "idea": { "keyLength": 16, "ivLength": 8 },
  "idea-cbc": { "keyLength": 16, "ivLength": 8 },
  "idea-cfb": { "keyLength": 16, "ivLength": 8 },
  "idea-ecb": { "keyLength": 16, "ivLength": 0 },
  "idea-ofb": { "keyLength": 16, "ivLength": 8 },
  "rc2":{ "keyLength": 128, "ivLength": 8 },
  "rc2-128" : { "keyLength": 128, "ivLength": 8 },
  "rc2-40": { "keyLength": 128, "ivLength": 8 },
  "rc2-40-cbc": { "keyLength": 128, "ivLength": 8 },
  "rc2-64": { "keyLength": 128, "ivLength": 8 },
  "rc2-64-cbc": { "keyLength": 128, "ivLength": 8 },
  "rc2-cbc": { "keyLength": 128, "ivLength": 8 },
  "rc2-cfb": { "keyLength": 128, "ivLength": 8 },
  "rc2-ecb": { "keyLength": 128, "ivLength": 0 },
  "rc2-ofb": { "keyLength": 128, "ivLength": 8 },
  "rc4": { "keyLength": 256, "ivLength": 0 },
  "rc4-40": { "keyLength": 256, "ivLength": 0 },
  "rc4-hmac-md5": { "keyLength": 256, "ivLength": 0 },
  "seed": { "keyLength": 16, "ivLength": 16 },
  "seed-cbc": { "keyLength": 16, "ivLength": 16 },
  "seed-cfb": { "keyLength": 16, "ivLength": 16 },
  "seed-ecb": { "keyLength": 16, "ivLength": 0 },
  "seed-ofb": { "keyLength": 16, "ivLength": 16 },
  "sm4": { "keyLength": 16, "ivLength": 16 },
  "sm4-cbc": { "keyLength": 16, "ivLength": 16 },
  "sm4-cfb": { "keyLength": 16, "ivLength": 16 },
  "sm4-ctr": { "keyLength": 16, "ivLength": 16 },
  "sm4-ecb": { "keyLength": 16, "ivLength": 0 },
  "sm4-ofb": { "keyLength": 16, "ivLength": 16 }
}
```
