import Express from 'express'
import Client from '../../db'
import { order, orderProduct, product, product_store, user, user_store } from '../types'
const request = require('supertest')
const app: Express.Application = require('../../server')
let mytok: string = ''

describe('Test Server', () => {
  describe('test /orders', () => {
    beforeAll(async function () {
      await user_store.create(user)
      await product_store.create(product)
      const response = await request(app).post('/signin').send({ first_name: user.first_name, password: 'testpass' })
      mytok = response.body.jwt
      console.log(response.body)
    })
    it('shoud return 200 ok create order', (done) => {
      request(app)
        .post('/orders')
        .send({ id: order.id, user_id: order.user_id, status: order.status })
        .set('Authorization', 'Bearer ' + mytok)
        .expect(200)
        .expect({ order })
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
        .expect(order)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok create order product', (done) => {
      request(app)
        .post('/orders/1/products')
        .send(orderProduct)
        .expect(200)
        .set('Authorization', 'Bearer ' + mytok)
        .expect(orderProduct)
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
        .send({ id: order.id, user_id: 33, status: order.status })
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
    await user_store.delete('1')
    await product_store.delete('1')
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
