import Client from '../db'
import { Order, OrderProduct } from '../models/order'
import { OrderDAO } from './dao/orderDAO'
export class OrderStore implements OrderDAO {
  async index (): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql = 'select * from Orders'
      const result = await conn.query(sql)
      conn.release()

      // @ts-ignore
      return result.rows
    } catch (error) {
      throw new Error(`Coudnt get Orders. Error:${error}`)
    }
  }

  async show (id: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM Orders WHERE id=($1)'

      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async create (o: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO Orders (user_id, status) VALUES($1, $2) RETURNING * '
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [o.user_id, o.status])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not add new Order ${o.id}. Error: ${err}`)
    }
  }

  async delete (id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM Orders WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()
      // @ts-ignore
      return result.rows
    } catch (err) {
      throw new Error(`Could not delete Order ${id}. Error: ${err}`)
    }
  }

  async addProduct (order_product: OrderProduct): Promise<OrderProduct> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [
        order_product.quantity,
        order_product.order_id,
        order_product.product_id
      ])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(
        `Could not add new product ${order_product.product_id}. Error: ${err}`
      )
    }
  }
}
