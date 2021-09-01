const { expect } = require('chai')
const { getHashes } = require('crypto')

const { getHmac } = require('../../dist/index')
const { superify } = require('../../dist/lib/super/super.hmac')

const body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pharetra lacus efficitur, viverra sapien nec, bibendum enim. Proin interdum velit ac velit volutpat finibus. Nullam sit amet porta sapien. Donec pharetra magna dapibus urna pellentesque, sed ultrices sem ultricies. Nam pharetra elementum sapien sit amet convallis. Donec iaculis mattis condimentum. Maecenas fermentum sit amet turpis id pharetra. Aenean ac sodales eros. Aenean ultrices sapien odio. Vivamus sit amet neque sed dui porta imperdiet. Maecenas semper volutpat felis, nec ornare lectus finibus non. Phasellus varius orci ac ipsum sollicitudin pharetra. Vestibulum venenatis, est eget sollicitudin aliquet, quam nibh dignissim justo, at commodo mi odio at erat. Suspendisse ut ullamcorper ipsum. Etiam molestie velit quis urna sodales, efficitur fringilla leo pellentesque. Nunc scelerisque nisl faucibus turpis fringilla, at tempor risus semper. Proin quam magna, sollicitudin eget mauris sed, aliquet rutrum nisi. Nullam a leo neque. Sed turpis est, vehicula nec elementum eu, rhoncus sit amet lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec eget sem facilisis, aliquam eros ut, bibendum sem. Vivamus et augue odio. Nullam vitae consectetur sem, et ultrices massa. Vestibulum non malesuada massa. Curabitur dolor tellus, faucibus nec nisl in, congue rutrum urna. Donec eget placerat nulla. Vestibulum a scelerisque dui. Nullam blandit odio erat, sed consequat dui vehicula eu. Quisque est urna, auctor vitae risus eu, porta commodo tellus. In sapien purus, bibendum vel porta at, scelerisque ut nisl. Nulla posuere, nisl vel lobortis vulputate, ante justo fringilla lorem, efficitur rhoncus eros est vel nunc. Nulla vitae malesuada eros, ultrices cursus odio. Donec vel metus quis nisi faucibus lacinia. Vivamus at posuere dui, eget lobortis purus. Phasellus lacus dolor, fermentum quis dictum non, congue eget nibh. Nulla a elementum leo. Nullam porta luctus magna, non pretium nibh rutrum at. Etiam porta fringilla ligula quis accumsan. Proin luctus, massa et congue fermentum, erat augue vulputate ante, vel vehicula sapien mi ac metus. Sed nec aliquet lorem. Sed sodales arcu sit amet velit bibendum ultricies. In sit amet eleifend augue. Duis a fringilla tortor. Phasellus euismod purus sem, vitae molestie lacus efficitur quis. Vivamus finibus libero nisl, eu fermentum massa feugiat eu. Nullam magna ante, pretium ac arcu vitae, luctus feugiat magna. Ut quis turpis nec mauris feugiat tristique. Suspendisse auctor tincidunt metus, non suscipit nisl dignissim id. Quisque vitae odio magna. Fusce hendrerit ut risus vel molestie. Phasellus convallis neque vel ipsum condimentum, eget tempor augue venenatis. Nulla cursus, nisl eget aliquam feugiat, leo velit luctus turpis, eu lobortis sem lacus sed tortor. Aenean hendrerit auctor purus sit amet vulputate. Integer id ornare libero. Nunc sed eleifend lacus.'

describe('hmac: generate consistent integrity with hash events', function () {
  for (const _id of getHashes()) {
    const binding = superify().disabled
    it(`executes algorithm '${_id}' [short]`, async function () {
      if (binding.includes(_id)) return this.skip()
      const hash = {
        key: '1234',
        content: body,
        digest: 'base64'
      }
      expect(hash.content).to.equal(body)

      const driver = getHmac(_id)
      const digested = await driver.digest(hash)
      expect(digested.content).to.not.equal(body)
    })
    it(`executes algorithm '${_id}' [long]`, async function () {
      if (binding.includes(_id)) return this.skip()
      const hash = {
        key: '1234',
        content: body,
        digest: 'base64',
        iter: 128
      }
      expect(hash.content).to.equal(body)

      const driver = getHmac(_id)
      const digested = await driver.digest(hash)
      expect(digested.content).to.not.equal(body)
    })
  }
})
