import { Order, OrderQuery } from '../../models/order'
import { OrderStore } from '../../dao/orderDAO'
import { product, store as product_store } from './productSpec'
import { user, store as user_store } from './user_spec'
const store = new OrderStore()
const order: Order = {
  id: 1,
  product: product,
  user: user,
  status: 'pending',
  qty: 1
}
const returnedOrder: OrderQuery = {
  id: 1,
  product_id: 2,
  user_id: 2,
  status: 'pending',
  qty: 1
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
    expect(result).toEqual(returnedOrder)
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
