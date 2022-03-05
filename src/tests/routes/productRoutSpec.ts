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
    it('shoud return 200 ok', (done) => {
      request(app)
        .post('/products')
        .send({ id: product.id, name: product.name, category: product.category, price: product.price })
        .expect(200)
        .expect(product)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok', (done) => {
      request(app)
        .get('/products')
        .expect(200)
        .expect(typeof Array)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
  })
})
