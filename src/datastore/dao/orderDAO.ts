import { Order } from '../../models/order'
export interface OrderDAO {
   index (): Promise<Order>
   show (id: number): Promise<Order>
   create (o: Order): Promise<Order>
   delete (id: string): Promise<Order>
}
