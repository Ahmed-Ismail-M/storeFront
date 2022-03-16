import express, { Request, Response } from 'express'
import {
  CreateOrderReq,
  CreateOrderRes,
  DeleteOrderReq,
  DeleteOrderRes
} from '../api/orderAPI'
import { OrderStore } from '../datastore/orderDS'
import { verifyAuthToken } from '../middlewares/auth'
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

const create: ExpressHandler<CreateOrderReq, CreateOrderRes | {}> = async (
  req,
  res
) => {
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
    res.status(400)
    res.send({ error: (error as Error).message })
  }
}

const destroy: ExpressHandler<DeleteOrderReq, DeleteOrderRes> = async (
  req,
  res
) => {
  try {
    const deleted = await store.delete(req.body.id as string)
    res.send({ order: deleted })
  } catch (error) {
    res.status(400)
    res.send({ error: (error as Error).message })
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
    res.send({ error: (err as Error).message })
  }
}
const update = async (_req: Request, res: Response) => {
  const order: Order = {
    user_id: _req.body.user_id as string,
    status: _req.body.status as string
  }
  try {
    const newOrder = await store.update(_req.params.id, order)
    res.send({ order: newOrder })
  } catch (error) {
    res.status(400)
    res.send({ error: (error as Error).message })
  }
}

const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, asyncWrapper(index))
  app.get('/orders/:id', verifyAuthToken, asyncWrapper(show))
  app.post('/orders', verifyAuthToken, asyncWrapper(create))
  app.delete('/orders', verifyAuthToken, asyncWrapper(destroy))
  app.post('/orders/:id/products', verifyAuthToken, asyncWrapper(addProduct))
  app.put('/orders/:id', verifyAuthToken, asyncWrapper(update))
}

export default orderRoutes
