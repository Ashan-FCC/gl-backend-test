'use strict'

const knex = require('knex')
const parseDatabaseUrl = require('parse-database-url')
const debug = require('debug')('datastores')

const MYSQL_CLIENT = 'mysql2'

const _connections = {}

module.exports = {

  get userData() {
    if (!_connections.userData) {
      _connections.userData = initializeMysqlConnection(process.env.MYSQL_CONNECTION)
    }
    return _connections.userData
  }
}

function initializeMysqlConnection(dbUrl) {
  const urlParams = parseDatabaseUrl(dbUrl)
  const loggableUrl = `${urlParams.user}@${urlParams.host}:${urlParams.port}/${urlParams.database}`
  const knexInstance = knex({
    client: MYSQL_CLIENT,
    connection: urlParams,
    pool: {
      min: 2,
      max: 10
    }
  })

  knexInstance.client.pool.acquire((err, client) => {
    if (err) {
      process.emit('terminate', `Mysql connection error:${urlParams.host}`)
    } else {
      knexInstance.client.pool.release(client)
    }
  })

  knexInstance.raw('SELECT VERSION()')
    .then(rs => debug(`connected mysql:${rs[0][0]['VERSION()']}`, loggableUrl))

  return knexInstance
}
