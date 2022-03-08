import express, { Request, Response } from 'express'
import { CreateOrderReq, CreateOrderRes } from '../api/orderAPI'
import { OrderStore } from '../datastore/orderDS'
import { ExpressHandler } from '../models/handler'
import { Order } from '../models/order'
const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
  const orders = await store.index()
  res.json(orders)
}
const show = async (req: Request, res: Response) => {
  const order = await store.show(parseInt(req.params.id) as number)
  res.json(order)
}

const create: ExpressHandler<CreateOrderReq, CreateOrderRes> = async (req, res) => {
  if (!req.body.product_id || !req.body.qty || !req.body.user_id) {
    res.status(400)
  }
  const order: Order = {
    user_id: req.body.user_id,
    product_id: req.body.product_id,
    status: 'pending'
  }
  const newOrder = await store.create(order)
  res.json(newOrder)
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id)
  res.json(deleted)
}

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/orders/:id', show)
  app.post('/orders', create)
  app.delete('/orders', destroy)
}

export default orderRoutes
