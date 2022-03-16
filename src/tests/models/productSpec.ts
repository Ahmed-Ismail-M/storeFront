import { ProductStore } from '../../datastore/productDS'
import Client from '../../db'
import { test_product } from '../types'
export const store = new ProductStore()
describe('product model', () => {
  it('should return product created', async () => {
    const result = await store.create(test_product)
    // @ts-ignore
    expect(result).toEqual(test_product)
  })
  it('should return a list of products', async () => {
    const result = await store.index()
    // @ts-ignore
    expect(result).toEqual([test_product])
  })
  it('should return selected product', async () => {
    const result = await store.show(1)
    // @ts-ignore
    expect(result).toEqual(test_product)
  })
  it('should return empty array', async () => {
    const result = await store.delete('1')
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
