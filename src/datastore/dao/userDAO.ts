import { User } from '../../models/user'
export interface UserDAO {
   index (): Promise<User>
   show (id: number): Promise<User>
   create (o: User): Promise<User>
   delete (id: string): Promise<User>
}
