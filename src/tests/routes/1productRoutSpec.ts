import Express from 'express'
import { Product } from '../../models/product'
const request = require('supertest')
const app: Express.Application = require('../../server')
const product :Product = {
  id: 3,
  name: 'product',
  price: 10.5,
  category: 'general'
}

describe('Test Server', () => {
  describe('test /products', () => {
    it('shoud return 200 ok create product', (done) => {
      request(app)
        .post('/products')
        .send({ id: product.id, name: product.name, category: product.category, price: product.price })
        .expect(200)
        .expect(product)
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
      request(app)
        .get('/products/3')
        .expect(200)
        .expect(product)
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
        .send({ id: product.id, name: product.name, category: product.category, price: 'string' })
        .expect(400)
        .expect({})
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
})
