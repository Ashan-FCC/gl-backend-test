'use strict'

const loginSchema = {
  type: 'object',
  required: [
    'email', 'password'
  ],
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 6
    }
  }
}

module.exports = {
  loginSchema
}
