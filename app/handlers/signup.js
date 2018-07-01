'use strict'

const bcrypt = require('bcrypt')
const Promise = require('bluebird')
const userModel = require('..//models/user')
const hashPassword = Promise.promisify(bcrypt.hash)
const createJWT = require('../jwt-helper')
const AuthFailed = require('../errors/auth-failed')

function signup(req, res, next) {

  const email = req.body.email
  const password = req.body.password

  return userModel.findUserByEmail(email)
    .then(users => {
      if (users.length > 0) {
        res.send(409, {message: 'User Exists'})
        throw new AuthFailed('Auth Failed')
      }
      return hashPassword(password, 10)
    })
    .then(hash => {
      const user = {
        email,
        password: hash,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      }
      return userModel.createUser(user)
    })
    .then(id => {
      const token = createJWT(email, id)
      res.send(201, {
        message: 'User Created',
        token
      })
      return next()
    })
    .catch(err => {
      return next(err)
    })
}

module.exports = signup
