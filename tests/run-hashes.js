const crypto = require('../index')

async function runTest (verbose = (process.argv.indexOf('-v') > -1)) {
  // Stats
  let passed = 0
  let failed = 0

  // Run Hashes
  console.info('[test:hsh:start]: starting hashing suite validation task')
  for (const hash of require('crypto').getHashes()) {
    const testSuite = await crypto.fetch(hash).catch((e) => {
      failed = failed + 1
      console.info(`  -> [hsh:failed-suite]: '${hash}' > 1:failed to init > ${e.message}`)
    })
    if (testSuite !== undefined) {
      const digest = await testSuite.digest(require('../lib/util/vector')(2048)).catch((e) => {
        failed = failed + 1
        console.info(`  -> [hsh:failed-suite]: '${hash}' > 1:failed to run > ${e.message}`)
      })
      if (digest !== undefined) {
        passed = passed + 1
        if (verbose) console.info(` --> [hsh:passed-suite]: '${hash}' > 1:responded > ${digest.data.substring(0, 18)}`)
      }
    }
    await sleep()
  }
  console.info(`[test:hsh:complete]: [${passed}/${Object.keys(require('crypto').getHashes()).length}]`)

  // Post Exit Code
  if (passed !== Object.keys(require('crypto').getHashes()).length) throw new Error('exiting with non-0 code, testing failed')
}
runTest()

// Testing Functions
function sleep () {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 32)
  })
}
