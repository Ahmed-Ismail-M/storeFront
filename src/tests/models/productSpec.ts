import { Product, ProductStore } from '../../models/product';
export const store = new ProductStore()
export const product: Product = {
  id: 1,
  name: 'testproduct',
  category: 'testcategory',
  price: 1000
}
describe('product model', () => {
  it('should return product created', async () => {
    const result = await store.create(product);
    // @ts-ignore
    expect(result).toEqual(product);
  })
  it('should return a list of products', async () => {
    const result = await store.index();
    // @ts-ignore
    expect(result).toEqual([product]);
  })
  it('should return selected product', async () => {
    const result = await store.show('1');
    // @ts-ignore
    expect(result).toEqual(product);
  })
  it('should return empty array', async () => {
    const result = await store.delete('1');
    // @ts-ignore
    expect(result).toEqual([]);
  })
})
