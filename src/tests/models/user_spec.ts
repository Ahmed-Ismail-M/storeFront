import { User } from '../../models/user'
import { UserStore } from '../../dao/userDAO'
export const store = new UserStore()
export const user: User = {
  id: 1,
  first_name: 'testuser',
  last_name: 'testname',
  password: 'testpass'
}
describe('user model', () => {
  it('should return user created', async () => {
    const result = await store.create(user)
    // @ts-ignore
    expect(result).toEqual(user)
  })
  it('should return a list of users', async () => {
    const result = await store.index()
    // @ts-ignore
    expect(result).toEqual([user])
  })
  it('should return selected user', async () => {
    const result = await store.show(1)
    // @ts-ignore
    expect(result).toEqual(user)
  })
  it('should return empty array', async () => {
    const result = await store.delete('1')
    // @ts-ignore
    expect(result).toEqual([])
  })
})
