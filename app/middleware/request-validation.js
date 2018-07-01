'use strict'

const BadRequestError = require('../errors/bad-request')
const Ajv = require('ajv')
const ajv = new Ajv({allErrors: true, coerceTypes: true})

module.exports = function buildValidation(schema) {
  const validate = ajv.compile(schema)

  return function requestValidation(req, res, next) {

    const payload = Object.keys(req.body).length ? req.body : req.query
    const result = validate(payload)
    if (!result) {
      const failures = validate.errors.map(e => {
        return `[${e.dataPath}]: ${e.message}`
      })

      const err = new BadRequestError(failures.join())
      return next(err)
    }

    return next()
  }
}
