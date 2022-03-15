export type Order = {
  id?: string | number
  user_id: string | number
  status: string
}
export type OrderProduct = {
  id?: string | number
  quantity: number,
  order_id: string,
  product_id: string
}
