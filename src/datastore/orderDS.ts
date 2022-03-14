import Client from '../db'
import { Order } from '../models/order'
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
      const result = await conn.query(sql, [
        o.user_id,
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
