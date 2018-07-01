'use strict'

const BaseError = require('./base-error')

class BadRequestError extends BaseError {

  constructor(message) {
    super(400, 'BadRequest', message)
  }
}

module.exports = BadRequestError