import express, { Request, Response } from 'express'
import { CreateOrderReq, CreateOrderRes, DeleteOrderReq, DeleteOrderRes } from '../api/orderAPI'
import { OrderStore } from '../datastore/orderDS'
import { asyncWrapper } from '../middlewares/logs'
import { ExpressHandler } from '../models/handler'
import { Order, OrderProduct } from '../models/order'
const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
  const orders = await store.index()
  res.json(orders)
}
const show = async (req: Request, res: Response) => {
  const order = await store.show(parseInt(req.params.id) as number)
  res.json(order)
}

const create: ExpressHandler<CreateOrderReq, CreateOrderRes | {}> = async (req, res) => {
  try {
    if (!req.body.user_id) {
      res.status(400)
    }
    const order: Order = {
      user_id: req.body.user_id as string,
      status: req.body.status as string
    }
    const newOrder = await store.create(order)
    res.send({ order: newOrder })
  } catch (error) {
    return res.status(400).json(error as string)
  }
}

const destroy: ExpressHandler<DeleteOrderReq, DeleteOrderRes> = async (req, res) => {
  try {
    const deleted = await store.delete(req.body.id as string)
    res.json(deleted)
  } catch (error) {
    res.status(400)
    res.send({ error })
  }
}
const addProduct = async (_req: Request, res: Response) => {
  const orderProduct: OrderProduct = {
    order_id: _req.params.id,
    product_id: _req.body.product_id,
    quantity: _req.body.quantity
  }

  try {
    const addedProduct = await store.addProduct(orderProduct)
    res.json(addedProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const orderRoutes = (app: express.Application) => {
  app.get('/orders', asyncWrapper(index))
  app.get('/orders/:id', asyncWrapper(show))
  app.post('/orders', asyncWrapper(create))
  app.delete('/orders', asyncWrapper(destroy))
  app.post('/orders/:id/products', asyncWrapper(addProduct))
}

export default orderRoutes
