'use strict'

require('dotenv').config({path: '.localenv', silent: true})

const server = require('./app/server')

const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log(`Server started. Listening on port: ${port}`)
})
