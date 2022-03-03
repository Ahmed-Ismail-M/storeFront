import { ProductStore } from '../../models/product';

const store = new ProductStore()

describe('product model', () => {
  it('should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  })
})
