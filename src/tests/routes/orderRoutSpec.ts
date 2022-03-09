import Express from 'express'
import { Order } from '../../models/order'
const request = require('supertest')
const app: Express.Application = require('../../server')
const order :Order = {
  id: 2,
  product_id: 2,
  user_id: 2,
  qty: 10,
  status: 'pending'
}
describe('Test Server', () => {
  describe('test /orders', () => {
    it('shoud return 200 ok create order', (done) => {
      request(app)
        .post('/orders')
        .send({ id: order.id, product_id: order.product_id, user_id: order.user_id, qty: order.qty, status: order.status })
        .expect(200)
        .expect({ order })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok get order', (done) => {
      request(app)
        .get('/orders')
        .expect(200)
        // .expect(typeof Array)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok get order by id', (done) => {
      request(app)
        .get('/orders/2')
        .expect(200)
        .expect(order)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok delete order', (done) => {
      request(app)
        .delete('/orders')
        .send({ id: 3 })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
  })
  describe('error test /orders', () => {
    it('shoud return error 400 qty is not string', (done) => {
      request(app)
        .post('/orders')
        .send({ id: order.id, product_id: order.product_id, user_id: order.user_id, qty: 'string', status: order.status })
        .expect(400)
        .expect({})
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return error 400 price is not a number', (done) => {
      request(app)
        .delete('/orders')
        .send({ id: 33 })
        .expect([])
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
  })
})
