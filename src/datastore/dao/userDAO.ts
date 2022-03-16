import { User } from '../../models/user'
export interface UserDAO {
  index(): Promise<User>
  show(id: number): Promise<User | undefined>
  showByName(first_name: string): Promise<User | undefined>
  create(o: User): Promise<User>
  delete(id: string): Promise<User>
}
