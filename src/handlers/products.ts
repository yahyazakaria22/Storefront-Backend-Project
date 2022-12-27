import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/products'
import { verifyAuthToken } from '../middleware/authorization'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id)
  res.json(product)
}

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
  }
  const newProduct = await store.create(product)
  res.json(newProduct)
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id)
  res.json(deleted)
}
const edit = async (req: Request, res: Response) => {
  const put = await store.put(req.params.id, req.body.name, req.body.price)
  res.json(put)
}

const ProductRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.put('/products/:id', verifyAuthToken, edit)
  app.post('/products', verifyAuthToken, create)
  app.delete('/products/:id', verifyAuthToken, destroy)
}

export default ProductRoutes
