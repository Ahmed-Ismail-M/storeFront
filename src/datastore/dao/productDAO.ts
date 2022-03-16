import { Product } from '../../models/product'
export interface ProductDAO {
  index(): Promise<Product>
  show(id: number): Promise<Product>
  create(o: Product): Promise<Product>
  delete(id: string): Promise<Product>
}
