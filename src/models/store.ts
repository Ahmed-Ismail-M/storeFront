import client from '../db'
export type Product = {
    id: number;
    name: string;
    type: string;
}

export class ProductStore {
  async index (): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = 'select * from products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Coudnt get products. Error:${error}`)
    }
  }

  async show (id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`)
    }
  }

  async create (product: Product): Promise<Product> {
    try {
      const sql = 'INSERT INTO products (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn
        .query(sql, [b.title, b.author, b.totalPages, b.summary])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not add new product ${title}. Error: ${err}`)
    }
  }

  async delete (id: string): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`)
    }
  }
}
