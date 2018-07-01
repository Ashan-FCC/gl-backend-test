'use strict'

const Promise = require('bluebird')
const request = require('supertest')
require('should')
const data = require('../data/index')
const server = require('../../app/server')

describe('POST /login - Register Users', () => {

  beforeEach(() => {
    return Promise.all([
      data.stubs.user.deleteStubs()
    ])
  })

  it('should fail if the required params are missing', function() {
    const context = {
      body: {
        email: 'tester@test.com'
      }
    }
    return request(server)
      .post('/login')
      .send({email: 'john'})
      .expect(400)
  })

  it('should log the user in', function() {
    const signupContext = {
      body: {
        email: 'tester@test.com',
        password: 'tester12',
        first_name: 'John',
        last_name: 'Doe'
      }
    }

    const loginContext = {
      body: {
        email: 'tester@test.com',
        password: 'tester12'
      }
    }

    return request(server)
      .post('/signup')
      .send(signupContext.body)
      .expect(201)
      .then(() => {
        return request(server)
          .post('/login')
          .send(loginContext.body)
          .expect(200)
          .then(res => {
            res.body.should.have.property('token').which.is.a.String()
          })
      })
  })

})