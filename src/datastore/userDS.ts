import Client from '../db'
import { User } from '../models/user'
import { hashPass } from '../utilities/security'
import { UserDAO } from './dao/userDAO'

export class UserStore implements UserDAO {
  async showByName (first_name: string): Promise<User | undefined> {
    try {
      const sql = 'SELECT * FROM Users WHERE first_name=($1)'

      const conn = await Client.connect()

      const result = await conn.query(sql, [first_name])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${first_name}. Error: ${err}`)
    }
  }

  async index (): Promise<User> {
    try {
      const conn = await Client.connect()
      const sql = 'select * from Users'
      const result = await conn.query(sql)
      conn.release()
      // @ts-ignore
      return result.rows
    } catch (error) {
      throw new Error(`Coudnt get Users. Error:${error}`)
    }
  }

  async show (id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM Users WHERE id=($1)'

      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create (u: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO Users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *'
      const conn = await Client.connect()
      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        hashPass(u.password)
      ])

      const User = result.rows[0]

      conn.release()

      return User
    } catch (err) {
      throw new Error(`Could not add new User ${u.first_name}. Error: ${err}`)
    }
  }

  async delete (id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM Users WHERE id=($1)'
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      const User = result.rows

      conn.release()
      // @ts-ignore
      return User
    } catch (err) {
      throw new Error(`Could not delete User ${id}. Error: ${err}`)
    }
  }
}
