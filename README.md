# <center> CryptoCipher v3 </center>

You can view a more complete documentation at our [GitHub Wiki](https://github.com/amethyst-studio/cryptocipher/wiki). You can also find small blog like articles there regarding the security of your workspace and how to protect all your users' personal information more effectively.

## <center> Developer Notes </center>

I would like to thank everyone for using CryptoCipher so far. I really do appricate seeing the history of my package having a small following.

This announces the official v3.0.0 of CryptoCipher. With this release, the **entire** codebase has been rewritten to TypeScript to provide typings to those who use TypeScript and ensure a more consistent and secure development environment moving forward.

Some major notes of this update are as follows:

> **IMPORTANT MIGRATION**: All Encryption, Decryption, and Hashing now use a single "context" object as their input. This is to allow more flexability of new features or contributions in the input without the garbage function parameters I had before... I don't know why I didn't just start with this haha...

> Documentation and Typings. If you write with TypeScript, provided typings are very helpful. Otherwise, this just provides basic documentation to your IDE for code completion and hovering.

> The functionality is identical to v1 and v2. While updating to the new format, all previous encryption and hashing should still be consistent. If this is not the case, please open an issue and we can work together to either convert encrypted data or apply corrections to the algorithm implementations.

## <center> v3.0 Cipher Integration </center>

```js
const { fetch } = require('cryptocipher')

async function main () {
  const driver = fetch('aes256')

  const encrypted = await driver.encrypt({
    key: '12312312312312311231231231231231',
    content: 'hello world'
  })
  console.info(encrypted)
  /*
  {
    content: '&7MUiLET-k=MmFX]/e56ab59568c98460ee8812cc1a51477b',
    aad: 'EUCH9&Px_@'
  }
  */

  const decrypted = await driver.decrypt({
    key: '12312312312312311231231231231231',
    content: encrypted.content,
    aad: encrypted.aad, // required if provided by encrypted
    tag: encrypted.tag // required if provided by encrypted
  })
  console.info(decrypted)
  /*
  {
    content: 'hello world'
  }
  */
}
main()

```

## <center> v3.0 Hashing Integration </center>

```js
const { fetch } = require('cryptocipher')

async function main () {
  const driver = fetch('sha256')

  const digest_1 = await driver.digest({
    content: 'hello world',
    digest: 'hex' // or base64, latin1
  })
  console.info(digest_1)
  /*
  {
    content: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
  }
  */

  const digest_2 = await driver.digest({
    content: 'hello world',
    digest: 'hex', // or base64, latin1
    iter: 300 // self iterate 300 times (passwords!)
  })
  console.info(digest_2)
  /*
  {
    content: 'd20ce3fe12c1b938ccd5346227cd5452cef7d345aff379300685f32ab56b753e'
  }
  */
}

main()
```
