/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order, OrderStore } from '../models/orders'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/users'
import dotenv from 'dotenv'
import supertest from 'supertest'
import app from '../index'
const request = supertest(app)

dotenv.config()
const { TOKEN_SECRET } = process.env
const token_secret: string = TOKEN_SECRET || ''

const store = new OrderStore()
const userStore = new UserStore()

describe('Orders Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should have a update method', () => {
    expect(store.put).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined()
  })
})
describe('Order CRUD', () => {
  let token: string,
    user_Id = '1',
    order_id: number
  let order: Order = {
    status: 'pending',
    user_id: user_Id,
  }
  const userIn: User = {
    username: 'test',
    password: '123',
  }
  beforeAll(async () => {
    const userIn: User = {
      username: 'test',
      password: '123',
    }
    const { body: userBody } = await request.post('/users').send(userIn)
    token = userBody
    const { user }: any = jwt.verify(token, token_secret)
    user_Id = user.id
  })
  afterAll(async () => {
    await request
      .delete(`/users/${user_Id}`)
      .set('Authorization', 'bearer ' + token)
  })
  it('gets the /orders endpoint', (done) => {
    request.get('/orders').then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })
  it('gets the /orders/:id endpoint', (done) => {
    request.get(`/orders/${user_Id}`).then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })
  it('add method test', async () => {
    const createUser: any = await userStore.create(userIn)
    user_Id = createUser.id
    order = {
      status: 'pending',
      user_id: user_Id,
    }
    const createOrder: any = await store.create(order)
    order_id = createOrder.id
    expect(createOrder.status).toEqual('pending')
    await store.delete(order_id.toString())
  })
  it('index method test', async () => {
    const createOrder: any = await store.create(order)
    const products = await store.index()
    order_id = createOrder.id
    expect(products).toBeTruthy
    await store.delete(order_id.toString())
  })
  it('show method test', async () => {
    const createOrder: any = await store.create(order)
    order_id = createOrder.id
    const orderShow = await store.show(order_id.toString())
    expect(orderShow).toEqual(createOrder)
    await store.delete(order_id.toString())
  })
  it('update method test', async () => {
    const createOrder: any = await store.create(order)
    order_id = createOrder.id
    const newOrder: Order = {
      status: 'saved',
      user_id: createOrder.user_id,
    }
    await store.put(order_id.toString(), newOrder.status, newOrder.user_id)
    const orderShow = await store.show(order_id.toString())
    expect(orderShow.status).toEqual(newOrder.status)
    expect(orderShow.user_id).toEqual(newOrder.user_id)
    await store.delete(order_id.toString())
  })
  it('delete method test', async () => {
    const createOrder: any = await store.create(order)
    order_id = createOrder.id
    await store.delete(order_id.toString())
    const orderShow = await store.show(order_id.toString())
    expect(orderShow).toBeNull
    await store.delete(order_id.toString())
  })
})
