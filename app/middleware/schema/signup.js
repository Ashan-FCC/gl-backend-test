'use strict'

const signupSchema = {
  type: 'object',
  required: [
    'email', 'password', 'first_name', 'last_name'
  ],
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 6
    },
    first_name: {
      type: 'string',
      minimum: 1
    },
    last_name: {
      type: 'string',
      minimum: 1
    }
  }
}

module.exports = {
  signupSchema
}
