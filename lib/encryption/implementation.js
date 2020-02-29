class EncryptionImplementation {
  get (requestedImplementation) {
    // Normalize '-wrap' variants.
    if (requestedImplementation.indexOf('wrap') > -1 && requestedImplementation.indexOf('id-') === -1) {
      requestedImplementation = requestedImplementation.replace('aes128-wrap', 'aes-128-wrap')
      requestedImplementation = requestedImplementation.replace('aes192-wrap', 'aes-192-wrap')
      requestedImplementation = requestedImplementation.replace('aes256-wrap', 'aes-256-wrap')
    }

    // Normalize base variants.
    let convertedImplementation
    if (requestedImplementation === 'aes128') convertedImplementation = requestedImplementation.replace('aes128', 'aes-128')
    if (requestedImplementation === 'aes192') convertedImplementation = requestedImplementation.replace('aes192', 'aes-192')
    if (requestedImplementation === 'aes256') convertedImplementation = requestedImplementation.replace('aes256', 'aes-256')

    const result = requestedImplementation.split('-')
    const suite = result[0]; result.shift()
    const extra = result.join('-')

    if (requestedImplementation === 'aes-128-wrap') requestedImplementation = requestedImplementation.replace('aes-128-wrap', 'aes128-wrap')
    if (requestedImplementation === 'aes-192-wrap') requestedImplementation = requestedImplementation.replace('aes-192-wrap', 'aes192-wrap')
    if (requestedImplementation === 'aes-256-wrap') requestedImplementation = requestedImplementation.replace('aes-256-wrap', 'aes256-wrap')

    let execution
    try {
      execution = require('./suites/' + suite)
    } catch (e) {
      execution = require('./suites/fallback')
    }

    const configuration = { suite, extra, result, convertedImplementation, requestedImplementation }
    const executionEnvironment = {}
    if (execution.encrypt) executionEnvironment.encrypt = async (text, key) => { return execution.encrypt(text, key, configuration) }
    if (execution.decrypt) executionEnvironment.decrypt = async (text, key, tag, aad) => { return execution.decrypt(text, key, tag, aad, configuration) }

    return executionEnvironment
  }
}

module.exports = new EncryptionImplementation()
