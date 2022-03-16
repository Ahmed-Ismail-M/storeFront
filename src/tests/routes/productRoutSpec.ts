import Express from 'express'
import Client from '../../db'
import { test_product, test_user, test_user_store } from '../types'
const request = require('supertest')
const app: Express.Application = require('../../server')
let mytok: string = ''
describe('Test Server', async () => {
  beforeAll(async function () {
    await test_user_store.create(test_user)
    const response = await request(app).post('/signin').send({ first_name: test_user.first_name, password: 'testpass' })
    mytok = response.body.jwt
  })
  describe('test /products', () => {
    it('shoud return 200 ok create product', (done) => {
      request(app)
        .post('/products')
        .send({
          id: test_product.id,
          name: test_product.name,
          category: test_product.category,
          price: test_product.price
        })
        .set('Authorization', 'Bearer ' + mytok)
        .expect(200)
        .expect(test_product)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok get products', (done) => {
      request(app)
        .get('/products')
        .expect(200)
        // .expect(typeof Array)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok get product by id', (done) => {
      console.log(mytok)
      request(app)
        .get('/products/1')
        .set('Authorization', 'Bearer ' + mytok)
        .expect(200)
        .expect(test_product)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok delete product', (done) => {
      request(app)
        .delete('/products')
        .send({ id: 3 })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
  })
  describe('error test /products', () => {
    it('shoud return error 400 price is not a number', (done) => {
      request(app)
        .post('/products')
        .set('Authorization', 'Bearer ' + mytok)
        .send({
          id: test_product.id,
          name: test_product.name,
          category: test_product.category,
          price: 'string'
        })
        .expect(400)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return error 400 price is not a number', (done) => {
      request(app)
        .delete('/products')
        .send({ id: 33 })
        .expect([])
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
  })
  afterAll(async () => {
    await test_user_store.delete('1')
    const conn = await Client.connect()
    const sql = 'ALTER SEQUENCE products_id_seq RESTART WITH 1; ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    await conn.query(sql)
    conn.release()
  })
})
