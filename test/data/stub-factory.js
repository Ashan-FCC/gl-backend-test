'use strict'

module.exports = function initialize(systemCode, knex) {

  return function createStubLoader(tableName) {
    return {

      deleteStubs() {
        return knex.transaction(trx => {
          return trx
            .raw('SET foreign_key_checks = 0')
            .then(() => {
              return trx.from(tableName)
                .whereNot({id: -1})
                .del()
            })
            .finally(() => trx.raw('SET foreign_key_checks = 1'))
        })
      }
    }
  }
}
