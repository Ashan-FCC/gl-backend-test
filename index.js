'use strict'

require('dotenv').config({path: '.localenv', silent: true})

const server = require('./app/server')
const dataStore = require('./app/datastore')
const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log(`Server started. Listening on port: ${port}`)
})

const terminate = why => {
  if (process.terminating) {
    return
  }

  process.terminating = true
  console.log(`process.terminating process ${why}..`)

  setTimeout(function () {
    server.close(function () {
      console.log(`server successfully closed - ${why}. terminated!`)
      dataStore.dispose()

      setTimeout(function () {
        process.exit(1)
      }, 100)
    })
  }, 1000)


  setTimeout(function () {
    console.log(`${why} - killed!`)
    dataStore.dispose()

    setTimeout(function () {
      process.exit(1)
    }, 100)
  }, 1000)
}

process.on('terminate', terminate)