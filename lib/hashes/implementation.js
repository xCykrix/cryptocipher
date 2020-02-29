class EncryptionImplementation {
  get (requestedImplementation) {
    const result = requestedImplementation.split('-')
    const suite = result[0]; result.shift()
    const extra = result.join('-')

    let execution
    try {
      execution = require('./suites/' + suite)
    } catch (e) {
      execution = require('./suites/fallback')
    }

    const configuration = { suite, extra, result, requestedImplementation }
    const executionEnvironment = {}
    if (execution.digest) executionEnvironment.digest = async (text, digest) => { return execution.digest(text, digest, configuration) }
    return executionEnvironment
  }
}

module.exports = new EncryptionImplementation()
