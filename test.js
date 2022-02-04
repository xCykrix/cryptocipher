const { getHmac } = require('./dist/index.js')
// import { getHmac } from 'cryptocipher';

async function main () {
  const driver = getHmac('sha256');

  const digest_1 = await driver.digest({
    key: '1234',
    content: 'hello world',
    digest: 'hex' // or base64, latin1
  });
  console.info(digest_1);
  /*
  {
    content: '5ce0fe96fe498b021f039f8abcda8c26f7f3b0fdbd66c9e0510568df7114bfec'
  }
  */

  const digest_2 = await driver.digest({
    key: '1234',
    content: 'hello world',
    digest: 'hex', // or base64, latin1
    iter: 300 // self iterate 300 times (passwords!)
  });
  console.info(digest_2);
  /*
  {
    content: 'a6f557681284293c48631c23ec5dc107c854ab471c033ad5c966f714b673e4f1'
  }
  */
}

main();
