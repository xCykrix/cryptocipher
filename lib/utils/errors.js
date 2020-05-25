class ModuleSecurityException extends Error {
  /**
   * Thrown when the security of the may be breached or misused.
   *
   * @param {string} message Description of the generated Error.
   * @return {Error} Initializes instance of the Error to be thrown.
   */
  constructor (message) {
    super(message)
    this.name = 'ModuleSecurityException'
    Error.captureStackTrace(this, ModuleSecurityException)
  }
}

class IllegalInputException extends Error {
  /**
   * Thrown when the user input is not valid and cannot be securely used for this module.
   *
   * @param {string} message Description of the generated Error.
   * @return {Error} Initializes instance of the Error to be thrown.
   */
  constructor (message) {
    super(message)
    this.name = 'IllegalInputException'
    Error.captureStackTrace(this, IllegalInputException)
  }
}

class IllegalSecretException extends Error {
  /**
   * Thrown when the secret key is not valid and cannot be securely used for this module.
   *
   * @param {string} message Description of the generated Error.
   * @return {Error} Initializes instance of the Error to be thrown.
   */
  constructor (message) {
    super(message)
    this.name = 'IllegalSecretException'
    Error.captureStackTrace(this, IllegalSecretException)
  }
}

class UnknownImplementationException extends Error {
  /**
   * Thrown when a crypto wrapper implementation was not able to be found.
   *
   * @param {string} message Description of the generated Error.
   * @return {Error} Initializes instance of the Error to be thrown.
   */
  constructor (message) {
    super(message)
    this.name = 'UnknownImplementationException'
    Error.captureStackTrace(this, UnknownImplementationException)
  }
}

class UnsupportedImplementationException extends Error {
  /**
   * Thrown when an implementation is not currently supported.
   *
   * @param {string} message Description of the generated Error.
   * @return {Error} Initializes instance of the Error to be thrown.
   */
  constructor (message) {
    super(message)
    this.name = 'UnsupportedImplementationException'
    Error.captureStackTrace(this, UnsupportedImplementationException)
  }
}

module.exports = {
  ModuleSecurityException,
  IllegalInputException,
  IllegalSecretException,
  UnknownImplementationException,
  UnsupportedImplementationException
}
