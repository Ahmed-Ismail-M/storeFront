import { User } from '../../models/user'
import { UserStore } from '../../datastore/userDS'
export const store = new UserStore()
export const user: User = {
  id: 1,
  first_name: 'testuser',
  last_name: 'testname',
  password: 'testpass'
}
export const userReturned: Pick<User, 'first_name' | 'last_name'> = {
  first_name: 'testuser',
  last_name: 'testname'
}
describe('user model', () => {
  it('should return user created', async () => {
    const result = await store.create(user)
    // @ts-ignore
    expect(result.first_name).toEqual(userReturned.first_name)
  })
  it('should return a list of users', async () => {
    const result = await store.index()
    // @ts-ignore
    expect(result).toEqual([
      jasmine.objectContaining({
        first_name: userReturned.first_name
      })
    ])
  })
  it('should return selected user', async () => {
    const result = await store.show(1)
    // @ts-ignore
    expect(result.first_name).toEqual(userReturned.first_name)
  })
  it('should return empty array', async () => {
    const result = await store.delete('1')
    // @ts-ignore
    expect(result).toEqual([])
  })
})
