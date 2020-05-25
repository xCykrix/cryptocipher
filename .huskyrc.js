module.exports = {
  hooks: {
    'pre-commit': 'yarn run module:test:lint',
    'pre-push': 'yarn run module:build'
  }
}
