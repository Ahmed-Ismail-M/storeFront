import Express from 'express'
import { GetUserRes } from '../../api/userAPI'
import { User } from '../../models/user'
const request = require('supertest')
const app: Express.Application = require('../../server')
const user :User = {
  id: 3,
  first_name: 'user',
  last_name: 'last name',
  password: 'general'
}
// const returnedUser :SignUpRes = {
//   id: 3,
//   first_name: 'user',
//   last_name: 'last name'
// }
const userReq : GetUserRes = {
  first_name: user.first_name,
  last_name: user.last_name
}
describe('Test Server', () => {
  describe('test /users', () => {
    it('shoud return 200 ok create user', (done) => {
      request(app)
        .post('/users')
        .send({ id: user.id, first_name: user.first_name, last_name: user.last_name, password: user.password })
        .expect(200)
        // .expect({ signupres: returnedUser })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('should sign in ', (done) => {
      request(app)
        .post('/signin')
        .send({ first_name: user.first_name, password: user.password })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok get users', (done) => {
      const response = request(app).post('/signin').send({ first_name: user.first_name, password: user.password })
      console.log('the token is :' + response.token)
      request(app)
        .get('/users')
        .set('Authorization', 'Bearer ' + response.token)
        .expect(200)
        // .expect(typeof Array)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok get user by id', (done) => {
      request(app)
        .get('/users/3')
        .expect(200)
        .expect(userReq)
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
    it('shoud return 400 missing password', (done) => {
      request(app)
        .post('/users')
        .send({ first_name: user.first_name, last_name: user.last_name })
        .expect(400)
        // .expect({ signupres: returnedUser })
        .expect('Content-Type', 'text/html; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
  })
})
