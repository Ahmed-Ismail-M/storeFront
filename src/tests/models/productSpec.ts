import Client from '../../db'
import { test_product, test_product_store, updated_test_product } from '../types'
describe('product model', () => {
  it('should return product created', async () => {
    const result = await test_product_store.create(test_product)
    // @ts-ignore
    expect(result).toEqual(test_product)
  })
  it('should return a list of products', async () => {
    const result = await test_product_store.index()
    // @ts-ignore
    expect(result).toEqual([test_product])
  })
  it('should return selected product', async () => {
    const result = await test_product_store.show(1)
    // @ts-ignore
    expect(result).toEqual(test_product)
  })
  it('should update product', async () => {
    const result = await test_product_store.update('1', { name: 'updatedproduct', category: 'updatedcategory', price: 500 })
    // @ts-ignore
    expect(result).toEqual(updated_test_product)
  })
  it('should return empty array', async () => {
    const result = await test_product_store.delete('1')
    // @ts-ignore
    expect(result).toEqual([])
  })
  afterAll(async () => {
    const conn = await Client.connect()
    const sql = 'ALTER SEQUENCE products_id_seq RESTART WITH 1'
    await conn.query(sql)
    conn.release()
  })
})
