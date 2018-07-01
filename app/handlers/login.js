'use strict'

const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const Promise = require('bluebird')
const createJWT = require('../jwt-helper')
const comparePassword = Promise.promisify(bcrypt.compare)
const AuthFailed = require('../errors/auth-failed')

function login(req, res, next) {
  let currentUser
  return userModel.findUserByEmail(req.body.email)
    .then(users => {
      if (users.length < 1) {
        throw new AuthFailed('Auth Failed. Incorrect username or password')
      }
      currentUser = users[0]
      return comparePassword(req.body.password, currentUser.password)
    })
    .then(result => {
      if (result) {
        const token = createJWT(currentUser.email, currentUser.id)
        res.send(200, {
          message: 'Login successful',
          token
        })
        return next()
      }
      throw new AuthFailed('Auth failed. Incorrect username or password')
    })
    .catch(err => {
      return next(err)
    })
}

module.exports = login
