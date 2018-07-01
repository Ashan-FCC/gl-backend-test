'use strict'

class BaseError extends Error {

  constructor(statusCode, errorCode, message, opts) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
    this.opts = opts
    Error.captureStackTrace(this, BaseError)
  }

  render() {
    return {
      code: this.errorCode,
      message: this.message,
      opts: this.opts
    }
  }
}

module.exports = BaseError
