import Client from '../../db'
import {
  order,
  orderProduct,
  product,
  product_store,
  store,
  user,
  user_store
} from '../types'

describe('order model', () => {
  beforeAll(async () => {
    await product_store.create(product)
    await user_store.create(user)
  })
  it('should return order created', async () => {
    const result = await store.create(order)
    // @ts-ignore
    expect(result).toEqual(order)
  })
  it('should return a list of orders', async () => {
    const result = await store.index()
    // @ts-ignore
    expect(result).toEqual([order])
  })
  it('should return selected order', async () => {
    const result = await store.show(1)
    // @ts-ignore
    expect(result).toEqual(order)
  })
  it('should add product to order', async () => {
    const result = await store.addProduct(orderProduct)
    expect(result).toEqual(orderProduct)
  })
  it('should return empty array', async () => {
    const result = await store.delete('1')
    // @ts-ignore
    expect(result).toEqual([])
  })
  afterAll(async () => {
    await product_store.delete('1')
    await user_store.delete('1')
    // await store.delete('1')
    const conn = await Client.connect()
    const sql =
    `
    ALTER SEQUENCE order_products_id_seq RESTART WITH 1;
    ALTER SEQUENCE orders_id_seq RESTART WITH 1;
    ALTER SEQUENCE users_id_seq RESTART WITH 1;
    ALTER SEQUENCE products_id_seq RESTART WITH 1;
    `
    await conn.query(sql)
    conn.release()
  })
})
