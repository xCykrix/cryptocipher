const { UnknownImplementationException, ModuleSecurityException } = require('./utils/errors')

async function index (identifier, type) {
  if (identifier.indexOf('..') > -1) {
    throw new ModuleSecurityException(`${type}:${identifier} has violated the internal security policy of this module. [IDENTIFIER:NO_CHANGE_DIRECTORY]`)
  }

  if (type.indexOf('..') > -1) {
    throw new ModuleSecurityException(`${type}:${identifier} has violated the internal security policy of this module. [TYPE:NO_CHANGE_DIRECTORY]`)
  }

  try {
    return new (require(`./driver/${type.toLowerCase()}/overrides/${identifier}`))({ identifier })
  } catch (ignored) {
    try {
      return new (require(`./driver/${type.toLowerCase()}/driver`))({ identifier })
    } catch (ignored) {
      throw new UnknownImplementationException(`${type}:${identifier} failed to load during bootstrap. If this is not a mistake, please report it at https://github.com/amethyst-studio/cryptocipher/issues for investigation.`)
    }
  }
}

module.exports = index
