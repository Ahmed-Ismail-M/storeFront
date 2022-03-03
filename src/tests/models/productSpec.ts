import { Product, ProductStore } from '../../models/product';
import dotenv from 'dotenv'
const store = new ProductStore()
const product: Product = {
  name: 'testproduct',
  category: 'testcategory',
  price: 1000
}
describe('product model', () => {
  // dotenv.config();
  // const oldEnv = process.env.ENV;
  // beforeAll(() => {
  //   process.env.ENV = 'test';
  //   console.log('beforeall' + process.env.ENV)
  // });
  // afterAll(() => {
  //   process.env.ENV = oldEnv;
  // });
  it('should return a list of products', async () => {
    const result = await store.index();
    // @ts-ignore
    expect(result).toEqual([]);
  })
  // it('should return product created', async () => {
  //   const result = await store.create(product);
  //   // @ts-ignore
  //   expect(result).toEqual(product);
  // })
  // it('should return a list of products', async () => {
  //   const result = await store.show('1');
  //   // @ts-ignore
  //   expect(result).toEqual([]);
  // })
  // it('should return a list of products', async () => {
  //   const result = await store.delete('1');
  //   // @ts-ignore
  //   expect(result).toEqual([]);
  // })
})
