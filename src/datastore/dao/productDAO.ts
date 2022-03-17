import { Product } from '../../models/product'
export interface ProductDAO {
  index(): Promise<Product>
  show(id: number): Promise<Product>
  create(p: Product): Promise<Product>
  delete(id: string): Promise<Product>
  update(id: string, p: Product): Promise<Product>
}
