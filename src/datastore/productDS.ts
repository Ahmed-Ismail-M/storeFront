import Client from '../db'
import { Product } from '../models/product'
import { ProductDAO } from './dao/productDAO'
export class ProductStore implements ProductDAO {
  async update (id: string, p: Product): Promise<Product> {
    try {
      const sql = `UPDATE Products SET name = ($1) , 
                  category = ($2), price = ($3) WHERE id=($4) RETURNING *`
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [p.name, p.category, p.price, id])

      conn.release()
      // @ts-ignore
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not update Product ${id}. Error: ${err}`)
    }
  }

  async index (): Promise<Product> {
    try {
      const conn = await Client.connect()
      const sql = 'select * from products'
      const result = await conn.query(sql)
      conn.release()
      // @ts-ignore
      return result.rows
    } catch (error) {
      throw new Error(`Coudnt get products. Error:${error}`)
    }
  }

  async show (id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`)
    }
  }

  async create (p: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, category, price) VALUES($1, $2, $3) RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [p.name, p.category, p.price])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
    }
  }

  async delete (id: string): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      const product = result.rows
      conn.release()
      // @ts-ignore
      return product
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`)
    }
  }
}
