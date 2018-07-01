'use strict'

const jwt = require("jsonwebtoken")

module.exports = (email, id) => {
  const token = jwt.sign(
    {
      email: email,
      userId: id
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1h"
    }
  )
  return token
}