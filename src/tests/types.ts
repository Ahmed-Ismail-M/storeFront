import { OrderStore } from '../datastore/orderDS'
import { UserStore } from '../datastore/userDS'
import { ProductStore } from '../datastore/productDS'
import { User } from '../models/user'
import { Order, OrderProduct } from '../models/order'
import { Product } from '../models/product'
import { GetUserRes } from '../api/userAPI'

export const user: User = {
  id: 1,
  first_name: 'testuser',
  last_name: 'testname',
  password: 'testpass'
}
export const userReq: GetUserRes = {
  first_name: 'testuser',
  last_name: 'testname'
}
export const order: Order = {
  id: 1,
  user_id: '1',
  status: 'pending'
}
export const product: Product = {
  id: 1,
  name: 'testproduct',
  category: 'testcategory',
  price: 1000
}
export const orderProduct: OrderProduct = {
  id: 1,
  order_id: '1',
  product_id: '1',
  quantity: 10
}
export const store = new OrderStore()
export const user_store = new UserStore()
export const product_store = new ProductStore()
