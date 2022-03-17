import { User } from '../../models/user'
import Client from '../../db'
import { test_user, test_user_store, updated_test_user } from '../types'

const userReturned: Pick<User, 'first_name' | 'last_name'> = {
  first_name: 'testuser',
  last_name: 'testname'
}
describe('user model', () => {
  it('should return user created', async () => {
    const result = await test_user_store.create(test_user)
    // @ts-ignore
    expect(result.first_name).toEqual(userReturned.first_name)
  })
  it('should return a list of users', async () => {
    const result = await test_user_store.index()
    // @ts-ignore
    expect(result).toEqual([
      jasmine.objectContaining({
        first_name: userReturned.first_name
      })
    ])
  })
  it('should return selected user', async () => {
    const result = await test_user_store.show(1)
    // @ts-ignore
    expect(result.first_name).toEqual(userReturned.first_name)
  })
  it('should update user', async () => {
    const result = await test_user_store.update('1', { first_name: 'updateduser', last_name: 'updatedname', password: 'updatedpassword' })
    // @ts-ignore
    expect(result.first_name).toEqual(updated_test_user.first_name)
  })
  it('should return empty array', async () => {
    const result = await test_user_store.delete('1')
    // @ts-ignore
    expect(result).toEqual([])
  })
  afterAll(async () => {
    const conn = await Client.connect()
    const sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1'
    await conn.query(sql)
    conn.release()
  })
})
