'use strict'

const restify = require('restify')
const {signup, login} = require('./handlers')
const checkAuth = require('./middleware/auth-handler')
const loginSchema = require('./middleware/schema/login').loginSchema
const signupSchema = require('./middleware/schema/signup').signupSchema
const validation = require('./middleware/request-validation')
const debug = require('debug')('restify-server')

const server = restify.createServer()

server.pre(restify.plugins.bodyParser())

server.use(function logger(req, res, next) {
  debug(new Date(), req.method, req.url)
  next()
})

server.post('/signup', validation(signupSchema), signup)

server.post('/login', validation(loginSchema), login)

server.get('/protected', checkAuth, (req, res, next) => {
  res.send(200, {message: 'Congrats! You\'re in protected routes'})
  next()
})

module.exports = server
