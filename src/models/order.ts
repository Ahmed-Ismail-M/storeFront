import { Product } from './product'
import { User } from './user'
export type Order = {
  id?: number
  product: Product
  qty: number
  user: User
  status: string
}
export type OrderQuery = {
  id?: number
  product_id: number
  qty: number
  user_id: number
  status: string
}
