'use strict'

const BaseError = require('./base-error')

class NotFoundError extends BaseError {
  constructor(message) {
    super(404, 'NotFound', message)
  }
}

module.exports = NotFoundError
