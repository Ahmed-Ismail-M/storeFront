// import { Order, OrderQuery } from '../models/order'
// import { ProductStore } from '../datastore/dao/productDAO'
// import { UserStore } from '../datastore/dao/userDAO'
// import { hashPass } from '../utilities/hash'

// const product_store = new ProductStore()
// const user_store = new UserStore()
// export const orderSerializer = async (result: OrderQuery): Promise<Order> => {
//   const order: Order = {
//     id: result.id,
//     product: await product_store.show(result.product_id),
//     user: await user_store.show(result.user_id),
//     status: result.status,
//     qty: result.qty
//   }
//   order.user.password = hashPass(order.user.password)
//   return order
// }
