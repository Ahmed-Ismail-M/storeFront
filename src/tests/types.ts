import { OrderStore } from '../datastore/orderDS'
import { UserStore } from '../datastore/userDS'
import { ProductStore } from '../datastore/productDS'
import { User } from '../models/user'
import { Order, OrderProduct } from '../models/order'
import { Product } from '../models/product'
import { GetUserRes } from '../api/userAPI'

export const test_user: User = {
  id: 1,
  first_name: 'testuser',
  last_name: 'testname',
  password: 'testpass'
}
export const updated_test_user: User = {
  id: 1,
  first_name: 'updateduser',
  last_name: 'updatedname',
  password: 'updatedpass'
}
export const test_userReq: GetUserRes = {
  first_name: 'testuser',
  last_name: 'testname'
}
export const test_order: Order = {
  id: 1,
  user_id: '1',
  status: 'pending'
}
export const updated_test_order: Order = {
  id: 1,
  user_id: '1',
  status: 'active'
}
export const test_product: Product = {
  id: 1,
  name: 'testproduct',
  category: 'testcategory',
  price: 1000
}
export const updated_test_product: Product = {
  id: 1,
  name: 'updatedproduct',
  category: 'updatedcategory',
  price: 500
}
export const test_orderProduct: OrderProduct = {
  id: 1,
  order_id: '1',
  product_id: '1',
  quantity: 10
}
export const test_order_store = new OrderStore()
export const test_user_store = new UserStore()
export const test_product_store = new ProductStore()
