import Express from 'express'
import Client from '../../db'
import { test_user, test_userReq } from '../types'
const request = require('supertest')
const app: Express.Application = require('../../server')
let mytok: string = ''
describe('Test Server', () => {
  describe('test /users', () => {
    it('shoud return 200 ok create user', (done) => {
      request(app)
        .post('/users')
        .send(test_user)
        .expect(200)
        // .expect({ signupres: returnedUser })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('should sign in ', (done) => {
      request(app)
        .post('/signin')
        .send({ first_name: test_user.first_name, password: test_user.password })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    beforeEach(async function () {
      const response = await request(app).post('/signin').send({ first_name: test_user.first_name, password: test_user.password })
      mytok = response.body.jwt
    })
    it('shoud return 200 ok get users', (done) => {
      request(app)
        .get('/users')
        .set('Authorization', 'Bearer ' + mytok)
        .expect(200)
        // .expect(typeof Array)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok get user by id', (done) => {
      request(app)
        .get('/users/1')
        .set('Authorization', 'Bearer ' + mytok)
        .expect(200)
        .expect(test_userReq)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok delete user', (done) => {
      request(app)
        .delete('/users')
        .set('Authorization', 'Bearer ' + mytok)
        .send({ id: 3 })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
  })
  describe('error test /users', () => {
    it('shoud return 400 missing password', (done) => {
      request(app)
        .post('/users')
        .send({ first_name: test_user.first_name, last_name: test_user.last_name })
        .set('Authorization', 'Bearer ' + mytok)
        .expect(400)
        // .expect({ signupres: returnedUser })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
  })
  afterAll(async () => {
    const conn = await Client.connect()
    const sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1'
    await conn.query(sql)
    conn.release()
  })
})
