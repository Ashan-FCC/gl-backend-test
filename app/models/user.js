'use strict'

const datastore = require('../datastore')

function findUserByEmail(email) {
  return datastore.userData
    .select(
      'user.id AS userId',
      'user.email AS email',
      'user.password AS password'
    )
    .from('user')
    .where({
      'user.email': email,
      'user.del_flag': 0
    })
    .then(users => {
      return users
    })
}

function createUser({email, password, first_name, last_name}) {
  return datastore.userData('user')
    .returning('id')
    .insert({
      email,
      password,
      first_name,
      last_name
    })
    .then(id => {
      return id[0]
    })
}

module.exports = {
  findUserByEmail,
  createUser
}