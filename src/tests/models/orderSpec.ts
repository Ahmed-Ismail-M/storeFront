import Client from '../../db'
import {
  test_order,
  test_orderProduct,
  test_product,
  test_product_store,
  test_order_store,
  test_user,
  test_user_store,
  updated_test_order
} from '../types'

describe('order model', () => {
  beforeAll(async () => {
    await test_product_store.create(test_product)
    await test_user_store.create(test_user)
  })
  it('should return order created', async () => {
    const result = await test_order_store.create(test_order)
    // @ts-ignore
    expect(result).toEqual(test_order)
  })
  it('should return a list of orders', async () => {
    const result = await test_order_store.index()
    // @ts-ignore
    expect(result).toEqual([test_order])
  })
  it('should return selected order', async () => {
    const result = await test_order_store.show(1)
    // @ts-ignore
    expect(result).toEqual(test_order)
  })
  it('should update order', async () => {
    const result = await test_order_store.update('1', { user_id: '1', status: 'active' })
    // @ts-ignore
    expect(result).toEqual(updated_test_order)
  })
  it('should add product to order', async () => {
    const result = await test_order_store.addProduct(test_orderProduct)
    expect(result).toEqual(test_orderProduct)
  })
  it('should return empty array', async () => {
    const result = await test_order_store.delete('1')
    // @ts-ignore
    expect(result).toEqual([])
  })
  afterAll(async () => {
    await test_product_store.delete('1')
    await test_user_store.delete('1')
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
