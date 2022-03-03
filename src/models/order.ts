import Client from '../db'
import { Product } from './product'
import { User } from './user'
export type Order = {
    id: number;
    product: Product;
    qty: number;
    user: User;
    status:string
}

export class OrderStore {
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

  async show (id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM Orders WHERE id=($1)'

      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`)
    }
  }

  async create (o: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO Orders (product_id, user_id, qty, status) VALUES($1, $2, $3, $4) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn
        .query(sql, [o.product.id, o.user.id, o.qty, o.status])

      const Order = result.rows[0]

      conn.release()

      return Order
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

      const Order = result.rows[0]

      conn.release()

      return Order
    } catch (err) {
      throw new Error(`Could not delete Order ${id}. Error: ${err}`)
    }
  }
}
