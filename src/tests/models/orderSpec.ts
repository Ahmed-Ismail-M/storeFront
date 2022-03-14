import { Order } from '../../models/order'
import { OrderStore } from '../../datastore/orderDS'
import { product, store as product_store } from './productSpec'
import { user, store as user_store } from './userSpec'
const store = new OrderStore()
const order: Order = {
  id: 1,
  user_id: '2',
  status: 'pending'
}
describe('order model', () => {
  beforeAll(async () => {
    product.id = 2
    user.id = 2
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
  it('should return empty array', async () => {
    const result = await store.delete('1')
    // @ts-ignore
    expect(result).toEqual([])
  })
})
