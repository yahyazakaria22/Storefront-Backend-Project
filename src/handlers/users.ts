import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/users'
import { verifyAuthToken } from '../middleware/authorization'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const { TOKEN_SECRET } = process.env
const token_secret: string = TOKEN_SECRET || ''

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index()
    res.json(users)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id)
    res.json(user)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      password: req.body.password,
    }
    const newuser = await store.create(user)
    const token = jwt.sign({ user: newuser }, token_secret)
    res.json(token)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id)
    res.json(deleted)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}
const edit = async (req: Request, res: Response) => {
  try {
    const put = await store.put(
      req.params.id,
      req.body.username,
      req.body.password
    )
    res.json(put)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.put('/users/:id', verifyAuthToken, edit)
  app.post('/users', create)
  app.delete('/users/:id', verifyAuthToken, destroy)
}

export default userRoutes
