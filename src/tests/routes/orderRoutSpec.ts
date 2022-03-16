import Express from 'express'
import Client from '../../db'
import { test_order, test_orderProduct, test_product, test_product_store, test_user, test_user_store } from '../types'
const request = require('supertest')
const app: Express.Application = require('../../server')
let mytok: string = ''

describe('Test Server', () => {
  describe('test /orders', () => {
    beforeAll(async function () {
      await test_user_store.create(test_user)
      await test_product_store.create(test_product)
      const response = await request(app).post('/signin').send({ first_name: test_user.first_name, password: 'testpass' })
      mytok = response.body.jwt
    })
    it('shoud return 200 ok create order', (done) => {
      request(app)
        .post('/orders')
        .send({ id: test_order.id, user_id: test_order.user_id, status: test_order.status })
        .set('Authorization', 'Bearer ' + mytok)
        .expect(200)
        .expect({ order: test_order })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok get order', (done) => {
      request(app)
        .get('/orders')
        .set('Authorization', 'Bearer ' + mytok)
        .expect(200)
        // .expect(typeof Array)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok get order by id', (done) => {
      request(app)
        .get('/orders/1')
        .set('Authorization', 'Bearer ' + mytok)
        .expect(200)
        .expect(test_order)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok update order by id', (done) => {
      request(app)
        .put('/orders/1')
        .set('Authorization', 'Bearer ' + mytok)
        .send({ user_id: '1', status: 'active' })
        .expect(200)
        .expect({ order: test_order })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok create order product', (done) => {
      request(app)
        .post('/orders/1/products')
        .send(test_orderProduct)
        .expect(200)
        .set('Authorization', 'Bearer ' + mytok)
        .expect(test_orderProduct)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok delete order', (done) => {
      request(app)
        .delete('/orders')
        .send({ id: 1 })
        .set('Authorization', 'Bearer ' + mytok)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
  })
  describe('error test /orders', () => {
    it('shoud return error 400 user_id not found', (done) => {
      request(app)
        .post('/orders')
        .send({ id: test_order.id, user_id: 33, status: test_order.status })
        .set('Authorization', 'Bearer ' + mytok)
        .expect(400)
        .expect({
          error:
            'Could not add new Order undefined. Error: error: insert or update on table "orders" violates foreign key constraint "fk_user"'
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return error 400 order id 33 not found', (done) => {
      request(app)
        .delete('/orders')
        .send({ id: 33 })
        .set('Authorization', 'Bearer ' + mytok)
        .expect({ order: [] })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
  })
  afterAll(async () => {
    await test_user_store.delete('1')
    await test_product_store.delete('1')
    const conn = await Client.connect()
    const sql =
      `
      ALTER SEQUENCE orders_id_seq RESTART WITH 1;
      ALTER SEQUENCE users_id_seq RESTART WITH 1;
      ALTER SEQUENCE products_id_seq RESTART WITH 1;
      `
    await conn.query(sql)
    conn.release()
  })
})
