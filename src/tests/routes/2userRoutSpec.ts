import Express from 'express'
import { User } from '../../models/user'
import { hashPass } from '../../utilities/hash'
const request = require('supertest')
const app: Express.Application = require('../../server')
const user :User = {
  id: 3,
  first_name: 'user',
  last_name: 'last name',
  password: 'general'
}
const returnedUser :User = {
  id: 3,
  first_name: 'user',
  last_name: 'last name',
  password: hashPass('general')
}

describe('Test Server', () => {
  describe('test /users', () => {
    it('shoud return 200 ok create user', (done) => {
      request(app)
        .post('/users')
        .send({ id: user.id, first_name: user.first_name, last_name: user.last_name, password: user.password })
        .expect(200)
        .expect(returnedUser)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok get users', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        // .expect(typeof Array)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok get user by id', (done) => {
      request(app)
        .get('/users/3')
        .expect(200)
        .expect(returnedUser)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok delete user', (done) => {
      request(app)
        .delete('/users')
        .send({ id: 3 })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
  })
  describe('error test /users', () => {
    it('shoud return error 400 price is not a number', (done) => {
      request(app)
        .delete('/users')
        .send({ id: 33 })
        .expect([])
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
  })
})
