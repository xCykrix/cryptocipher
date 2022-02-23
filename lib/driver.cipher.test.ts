// trunk-ignore-all(eslint/@typescript-eslint/require-await): This rule is not needed in the testing suite.

// Pull the testing suite dependencies.
import { expect } from 'chai';
import { getCiphers } from 'crypto';
import { relative } from 'path';
import { getCipher } from '..';
import { superify } from './super/super.cipher';
import { generate } from './utils/util';

// Initialize the test state.
const location = `./${relative(process.cwd(), __filename.replace('.test', ''))}`;
const body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pharetra lacus efficitur, viverra sapien nec, bibendum enim. Proin interdum velit ac velit volutpat finibus. Nullam sit amet porta sapien. Donec pharetra magna dapibus urna pellentesque, sed ultrices sem ultricies. Nam pharetra elementum sapien sit amet convallis. Donec iaculis mattis condimentum. Maecenas fermentum sit amet turpis id pharetra. Aenean ac sodales eros. Aenean ultrices sapien odio. Vivamus sit amet neque sed dui porta imperdiet. Maecenas semper volutpat felis, nec ornare lectus finibus non. Phasellus varius orci ac ipsum sollicitudin pharetra. Vestibulum venenatis, est eget sollicitudin aliquet, quam nibh dignissim justo, at commodo mi odio at erat. Suspendisse ut ullamcorper ipsum. Etiam molestie velit quis urna sodales, efficitur fringilla leo pellentesque. Nunc scelerisque nisl faucibus turpis fringilla, at tempor risus semper. Proin quam magna, sollicitudin eget mauris sed, aliquet rutrum nisi. Nullam a leo neque. Sed turpis est, vehicula nec elementum eu, rhoncus sit amet lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec eget sem facilisis, aliquam eros ut, bibendum sem. Vivamus et augue odio. Nullam vitae consectetur sem, et ultrices massa. Vestibulum non malesuada massa. Curabitur dolor tellus, faucibus nec nisl in, congue rutrum urna. Donec eget placerat nulla. Vestibulum a scelerisque dui. Nullam blandit odio erat, sed consequat dui vehicula eu. Quisque est urna, auctor vitae risus eu, porta commodo tellus. In sapien purus, bibendum vel porta at, scelerisque ut nisl. Nulla posuere, nisl vel lobortis vulputate, ante justo fringilla lorem, efficitur rhoncus eros est vel nunc. Nulla vitae malesuada eros, ultrices cursus odio. Donec vel metus quis nisi faucibus lacinia. Vivamus at posuere dui, eget lobortis purus. Phasellus lacus dolor, fermentum quis dictum non, congue eget nibh. Nulla a elementum leo. Nullam porta luctus magna, non pretium nibh rutrum at. Etiam porta fringilla ligula quis accumsan. Proin luctus, massa et congue fermentum, erat augue vulputate ante, vel vehicula sapien mi ac metus. Sed nec aliquet lorem. Sed sodales arcu sit amet velit bibendum ultricies. In sit amet eleifend augue. Duis a fringilla tortor. Phasellus euismod purus sem, vitae molestie lacus efficitur quis. Vivamus finibus libero nisl, eu fermentum massa feugiat eu. Nullam magna ante, pretium ac arcu vitae, luctus feugiat magna. Ut quis turpis nec mauris feugiat tristique. Suspendisse auctor tincidunt metus, non suscipit nisl dignissim id. Quisque vitae odio magna. Fusce hendrerit ut risus vel molestie. Phasellus convallis neque vel ipsum condimentum, eget tempor augue venenatis. Nulla cursus, nisl eget aliquam feugiat, leo velit luctus turpis, eu lobortis sem lacus sed tortor. Aenean hendrerit auctor purus sit amet vulputate. Integer id ornare libero. Nunc sed eleifend lacus.';

// Test 1: Validate the expected processing state when using valid information.
describe(`Side-by-side Check - Test 1 - Functional Integrity - '${location}'`, function () {
  const disabled = superify().disabled;
  for (const identifier of getCiphers()) {
    it(`should execute algorithm '${identifier}'`, async function () {
      const binding = superify().overrides[identifier];
      if (disabled.includes(identifier)) {
        this.skip();
      }

      if (binding === undefined) throw new Error(`Security policy binding was not defined for '${identifier}'. Please report this to the GitHub issues.`);
      expect(binding).to.have.property('ivLength');
      expect(binding).to.have.property('keyLength');
      expect(binding).to.have.property('tagLength');

      for (let i = 0; i < 5; i++) {
        // Get the driver based on the algorithm.
        const driver = getCipher(identifier);

        // Build encryption context.
        const encrypt = {
          key: generate(binding.keyLength),
          content: body,
        };
        expect(encrypt.key.length).to.equal(binding.keyLength);

        // Encrypt.
        const encrypted = await driver.encrypt(encrypt);

        // Build decryption context.
        const decrypt: {
          key: string;
          content: string;
          aad?: string;
          tag?: string;
        } = {
          key: encrypt.key,
          content: encrypted.content,
        };
        if (encrypted.aad) decrypt.aad = encrypted.aad;
        if (encrypted.tag) decrypt.tag = encrypted.tag;

        // Decrypt.
        const decrypted = await driver.decrypt(decrypt);
        expect(decrypted.content).to.equal(body);
      }
    });
  }
});

describe(`Side-by-side Check - Test 2 - Stateful Integrity - '${location}'`, function () {
  it('should report "id_unknown" when an unknown identifier is requested', async function () {
    try {
      getCipher('unknown');
    } catch (err) {
      expect((err as Error).message).to.include('id_unknown');
    }
  });

  it('should report "id_disabled" when a disabled identifier is requested', async function () {
    try {
      getCipher('aes-256-cbc-hmac-sha1');
    } catch (err) {
      expect((err as Error).message).to.include('id_disabled');
    }
  });

  it('should report "OOB_keyLength" when the key is not acceptable', async function () {
    try {
      await getCipher('aes256').encrypt({
        key: '123',
        content: 'hello world',
      }).catch((err) => {
        expect((err as Error).message).to.include('OOB_keyLength');
      });
      await getCipher('aes256').decrypt({
        key: '123',
        content: 'is never used',
      });
    } catch (err) {
      const error = err as Error;
      expect(error.message).to.include('OOB_keyLength');
    }
  });

  it('should report "OOB_contentLength" when the content is not acceptable', async function () {
    try {
      await getCipher('aes256').encrypt({
        key: '12312312312312313123141251231412',
        content: '',
      }).catch((err) => {
        expect((err as Error).message).to.include('OOB_contentLength');
      });
      await getCipher('aes256').decrypt({
        key: '12312312312312313123141251231412',
        content: '',
      }).catch((err) => {
        expect((err as Error).message).to.include('OOB_contentLength');

      });
    } catch (err) {
      expect((err as Error).message).to.include('OOB_contentLength');
    }
  });
});
