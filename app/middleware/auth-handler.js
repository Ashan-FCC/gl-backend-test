'use strict'

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    req.userData = decoded
    return next()
  } catch (error) {
    res.send(401, {message: 'Auth failed'})
    return next(false)
  }
}
