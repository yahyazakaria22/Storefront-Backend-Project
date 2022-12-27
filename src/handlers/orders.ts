import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/orders'
import { verifyAuthToken } from '../middleware/authorization'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
  const orders = await store.index()
  res.json(orders)
}

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id)
  res.json(order)
}

const create = async (req: Request, res: Response) => {
  const order: Order = {
    status: req.body.status,
    user_id: req.body.user_id,
  }
  const newOrder = await store.create(order)
  res.json(newOrder)
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id)
  res.json(deleted)
}
const edit = async (req: Request, res: Response) => {
  const put = await store.put(req.params.id, req.body.status, req.body.user_id)
  res.json(put)
}

const OrderRoutes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/orders/:id', show)
  app.put('/orders/:id', verifyAuthToken, edit)
  app.post('/orders', verifyAuthToken, create)
  app.delete('/orders/:id', verifyAuthToken, destroy)
}

export default OrderRoutes
