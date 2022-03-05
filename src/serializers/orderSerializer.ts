import { Order, OrderQuery } from '../models/order'
import { ProductStore } from '../dao/productDAO'
import { UserStore } from '../dao/userDAO'

const product_store = new ProductStore()
const user_store = new UserStore()
export const orderSerializer = async (result: OrderQuery): Promise<Order> => {
  const order: Order = {
    id: result.id,
    product: await product_store.show(result.product_id),
    user: await user_store.show(result.user_id),
    status: result.status,
    qty: result.qty
  }

  return order
}
