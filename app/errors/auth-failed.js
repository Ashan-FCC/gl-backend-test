'use strict'

const BaseError = require('./base-error')

class AuthFailed extends BaseError {

  constructor(message) {
    super(401, 'NotAuthorized', message)
  }
}

module.exports = AuthFailed