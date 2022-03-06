// trunk-ignore-all(eslint/@typescript-eslint/require-await): This rule is not needed in the testing suite.
// trunk-ignore-all(eslint/@typescript-eslint/no-misused-promises): This rule is not needed in the testing suite.

// Pull the testing suite dependencies.
import { expect } from 'chai';
import { BinaryToTextEncoding, getHashes } from 'crypto';
import { relative } from 'path';
import { getHmac } from '..';
import { superify } from './super/super.hmac';

// Initialize the test state.
const location = `./${relative(process.cwd(), __filename.replace('.test', ''))}`;
const body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pharetra lacus efficitur, viverra sapien nec, bibendum enim. Proin interdum velit ac velit volutpat finibus. Nullam sit amet porta sapien. Donec pharetra magna dapibus urna pellentesque, sed ultrices sem ultricies. Nam pharetra elementum sapien sit amet convallis. Donec iaculis mattis condimentum. Maecenas fermentum sit amet turpis id pharetra. Aenean ac sodales eros. Aenean ultrices sapien odio. Vivamus sit amet neque sed dui porta imperdiet. Maecenas semper volutpat felis, nec ornare lectus finibus non. Phasellus varius orci ac ipsum sollicitudin pharetra. Vestibulum venenatis, est eget sollicitudin aliquet, quam nibh dignissim justo, at commodo mi odio at erat. Suspendisse ut ullamcorper ipsum. Etiam molestie velit quis urna sodales, efficitur fringilla leo pellentesque. Nunc scelerisque nisl faucibus turpis fringilla, at tempor risus semper. Proin quam magna, sollicitudin eget mauris sed, aliquet rutrum nisi. Nullam a leo neque. Sed turpis est, vehicula nec elementum eu, rhoncus sit amet lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec eget sem facilisis, aliquam eros ut, bibendum sem. Vivamus et augue odio. Nullam vitae consectetur sem, et ultrices massa. Vestibulum non malesuada massa. Curabitur dolor tellus, faucibus nec nisl in, congue rutrum urna. Donec eget placerat nulla. Vestibulum a scelerisque dui. Nullam blandit odio erat, sed consequat dui vehicula eu. Quisque est urna, auctor vitae risus eu, porta commodo tellus. In sapien purus, bibendum vel porta at, scelerisque ut nisl. Nulla posuere, nisl vel lobortis vulputate, ante justo fringilla lorem, efficitur rhoncus eros est vel nunc. Nulla vitae malesuada eros, ultrices cursus odio. Donec vel metus quis nisi faucibus lacinia. Vivamus at posuere dui, eget lobortis purus. Phasellus lacus dolor, fermentum quis dictum non, congue eget nibh. Nulla a elementum leo. Nullam porta luctus magna, non pretium nibh rutrum at. Etiam porta fringilla ligula quis accumsan. Proin luctus, massa et congue fermentum, erat augue vulputate ante, vel vehicula sapien mi ac metus. Sed nec aliquet lorem. Sed sodales arcu sit amet velit bibendum ultricies. In sit amet eleifend augue. Duis a fringilla tortor. Phasellus euismod purus sem, vitae molestie lacus efficitur quis. Vivamus finibus libero nisl, eu fermentum massa feugiat eu. Nullam magna ante, pretium ac arcu vitae, luctus feugiat magna. Ut quis turpis nec mauris feugiat tristique. Suspendisse auctor tincidunt metus, non suscipit nisl dignissim id. Quisque vitae odio magna. Fusce hendrerit ut risus vel molestie. Phasellus convallis neque vel ipsum condimentum, eget tempor augue venenatis. Nulla cursus, nisl eget aliquam feugiat, leo velit luctus turpis, eu lobortis sem lacus sed tortor. Aenean hendrerit auctor purus sit amet vulputate. Integer id ornare libero. Nunc sed eleifend lacus.';

// Test 1: Validate the expected processing state when using valid information.
describe(`Side-by-side Check - Test 1 - Functional Integrity - '${location}'`, function () {
  const disabled = superify().disabled;
  for (const identifier of getHashes()) {
    it(`should execute algorithm [single/duplex] '${identifier}`, async function () {
      if (disabled.includes(identifier)) {
        this.skip();
      }

      for (let i = 0; i < 5; i++) {
        // Get the driver based on the algorithm.
        const driver = getHmac(identifier);

        // Build HMAC context.
        const hash: {
          key: string
          content: string
          digest: BinaryToTextEncoding,
          iter?: number
        } = {
          key: '123123',
          content: body,
          digest: 'base64',
        };

        // Single-hash.
        const singleDigest = await driver.digest(hash);
        expect(singleDigest.content).to.not.equal(body);

        // Duplex-hash.
        hash.iter = 128;
        const duplexDigest = await driver.digest(hash);
        expect(duplexDigest.content).to.not.equal(singleDigest.content);
        expect(duplexDigest.content).to.not.equal(body);
      }
    });
  }
});

describe(`Side-by-side Check - Test 2 - Stateful Integrity - '${location}'`, function () {
  it('should report "id_unknown" when an unknown identifier is requested', async function () {
    try {
      getHmac('unknown');
    } catch (err) {
      expect((err as Error).message).to.include('id_unknown');
    }
  });

  it('should report "id_disabled" when a disabled identifier is requested', async function () {
    try {
      getHmac('shake128');
    } catch (err) {
      expect((err as Error).message).to.include('id_disabled');
    }
  });

  // OOB_keyLength
  it('should report "OOB_keyLength" when the key is not acceptable', async function () {
    try {
      await getHmac('sha256').digest({
        key: '',
        content: 'hello world',
        digest: 'base64',
      }).catch((err) => {
        expect((err as Error).message).to.include('OOB_keyLength');
      });
    } catch (err) {
      expect((err as Error).message).to.include('OOB_keyLength');
    }
  });

  it('should report "OOB_contentLength" when the content is not acceptable', async function () {
    try {
      await getHmac('sha256').digest({
        key: '123123123123',
        content: '',
        digest: 'base64',
      }).catch((err) => {
        expect((err as Error).message).to.include('OOB_contentLength');
      });
    } catch (err) {
      expect((err as Error).message).to.include('OOB_contentLength');
    }
  });

  it('should default to "base64" when the encoding is not acceptable or unsupported', async function () {
    const digestBase64 = await getHmac('sha1').digest({
      key: '123',
      content: 'hello world',
      digest: 'base64',
    });
    const digestBase64Defaulted = await getHmac('sha1').digest({
      key: '123',
      content: 'hello world',
      digest: 'base64url',
    });
    expect(digestBase64Defaulted.content).to.equal(digestBase64.content);
  });
});
