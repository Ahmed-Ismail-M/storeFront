import { Order } from '../models/order';

export type CreateOrderReq = Pick<Order, 'product_id'|'qty'|'user_id'|'status'>
export interface CreateOrderRes {order: Order}
export type DeleteOrderReq = Pick<Order, 'id'>
export interface DeleteOrderRes {}
