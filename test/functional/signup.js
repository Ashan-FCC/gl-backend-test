'use strict'

const Promise = require('bluebird')
const request = require('supertest')

// const helper = require('./helper')
const data = require('../data/index')
const server = require('../../app/server')

describe('POST /signup - Register Users', () => {

  beforeEach(() => {
    return Promise.all([
      data.stubs.user.deleteStubs()
    ])
  })

  it('should fail if the required params are missing', function () {

    return request(server)
      .post('/signup')
      .send({first_name: 'john'})
      .expect(400)

  })

  it('should sign user up if params are present', function () {
    const context = {
      body: {
        email: 'tester@test.com',
        password: 'test123',
        first_name: 'John',
        last_name: 'Doe'
      }
    }
    return request(server)
      .post('/signup')
      .send(context.body)
      .expect(201)
  })

  it('should fail if the user is already signed up', () => {
    const context = {
      body: {
        email: 'tester@test.com',
        password: 'test123',
        first_name: 'John',
        last_name: 'Doe'
      }
    }
    return request(server)
      .post('/signup')
      .send(context.body)
      .expect(201)
      .then(() => {
        request(server)
          .post('/signup')
          .expect(409)
      })
  })
})
