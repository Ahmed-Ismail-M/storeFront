import Client from '../db'
import { orderSerializer } from '../serializers/orderSerializer'
import { Order } from '../models/order'
export class OrderStore {
  async index (): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql = 'select * from Orders'
      const result = await conn.query(sql)
      conn.release()
      for (let r = 0; r < result.rows.length; ++r) {
        result.rows[r] = await orderSerializer(result.rows[r])
      }
      // result.rows.forEach(async (row) => { row = await orderSerializer(row) })
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
      const order: Promise<Order> = orderSerializer(result.rows[0])
      return order
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async create (o: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO Orders (product_id, user_id, qty, status) VALUES($1, $2, $3, $4) RETURNING * '
      // @ts-ignore
      const conn = await Client.connect()
      console.log(o.product.id + ' ' + o.user.id)
      const result = await conn.query(sql, [
        o.product.id,
        o.user.id,
        o.qty,
        o.status
      ])

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
}
