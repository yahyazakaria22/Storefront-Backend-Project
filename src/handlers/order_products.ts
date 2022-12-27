import express, { Request, Response, Router } from 'express'
import { OrderProducts, OrderProductsStore } from '../models/order_products'
import { verifyAuthToken } from '../middleware/authorization'

const store = new OrderProductsStore()

const index = async (_req: Request, res: Response) => {
  const order_products = await store.index()
  res.json(order_products)
}

const show = async (req: Request, res: Response) => {
  const order_products = await store.show(req.params.id)
  res.json(order_products)
}

const create = async (req: Request, res: Response) => {
  const order_products = await store.create(
    req.body.quantity,
    req.body.order_id,
    req.body.product_id
  )
  res.json(order_products)
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id)
  res.json(deleted)
}
const edit = async (req: Request, res: Response) => {
  const put = await store.put(
    req.params.id,
    req.body.quantity,
    req.body.order_id,
    req.body.product_id
  )
  res.json(put)
}

const OrderProductRoutes = (app: express.Application) => {
  app.get('/order_products', index)
  app.get('/order_products/:id', show)
  app.put('/order_products/:id', verifyAuthToken, edit)
  app.post('/order_products', verifyAuthToken, create)
  app.delete('/order_products/:id', verifyAuthToken, destroy)
}

export default OrderProductRoutes
