import express, { Request, Response } from 'express'
import { Product } from '../models/product'
import { ProductStore } from '../datastore/productDS'
import { verifyAuthToken } from '../middlewares/auth'
// import { verifyAuthToken } from '../middlewares/auth'
const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}
const show = async (req: Request, res: Response) => {
  const product = await store.show(parseInt(req.params.id) as number)
  res.json(product)
}

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price
    }

    const newProduct = await store.create(product)
    res.json(newProduct)
  } catch (err) {
    res.status(400)
    res.send({ error: (err as Error).message })
  }
}
const update = async (_req: Request, res: Response) => {
  const product: Product = {
    name: _req.body.name as string,
    category: _req.body.category as string,
    price: _req.body.price
  }
  try {
    const newProduct = await store.update(_req.params.id, product)
    res.send({ product: newProduct })
  } catch (error) {
    res.status(400)
    res.send({ error: (error as Error).message })
  }
}
const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id)
  res.json(deleted)
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
  app.delete('/products', verifyAuthToken, destroy)
  app.put('/products/:id', verifyAuthToken, update)
}

export default productRoutes
