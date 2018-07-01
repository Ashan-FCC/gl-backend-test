'use strict'

const knex = require('knex')
const SqlFixtures = require('sql-fixtures')
const parseDatabaseUrl = require('parse-database-url')

const stubFactory = require('./stub-factory')

const userData = knex({
  client: 'mysql2',
  connection: parseDatabaseUrl(process.env.MYSQL_CONNECTION),
  pool: {
    min: 1,
    max: 2
  }
})

const userDataLoader = new SqlFixtures(userData)
const userDataStubManager = stubFactory('userData', userData, userDataLoader)

module.exports = {
  stubs: {
    user: userDataStubManager('user', () => ({})),
  }
}
