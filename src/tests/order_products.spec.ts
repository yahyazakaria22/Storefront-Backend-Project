/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order, OrderStore } from '../models/orders'
import { Product, ProductStore } from '../models/products'
import { OrderProducts, OrderProductsStore } from '../models/order_products'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/users'
import dotenv from 'dotenv'
import supertest from 'supertest'
import app from '../index'
const request = supertest(app)

dotenv.config()
const { TOKEN_SECRET } = process.env
const token_secret: string = TOKEN_SECRET || ''

const store = new OrderProductsStore()
const userStore = new UserStore()
const orderStore = new OrderStore()
const productStore = new ProductStore()

describe('Orders Product Model', () => {
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
describe('Order Products CRUD', () => {
  let token: string,
    user_Id = '1',
    order_id: number,
    userIn_Id: number
  let order: Order = {
    status: 'pending',
    user_id: user_Id,
  }
  const userIn: User = {
    username: 'test',
    password: '123',
  }
  let orderProduct: OrderProducts = {
    quantity: 'string',
    order_id: 1,
    product_id: 1,
  }
  const product: Product = {
    name: 'product1',
    price: 10,
  }
  beforeAll(async () => {
    const userIn: User = {
      username: 'test',
      password: '123',
    }
    const { body: userBody } = await request.post('/users').send(userIn)
    token = userBody
    const { user }: any = jwt.verify(token, token_secret)
    userIn_Id = user.id
  })
  afterAll(async () => {
    await request
      .delete(`/users/${userIn_Id}`)
      .set('Authorization', 'bearer ' + token)
  })
  it('gets the /order_products endpoint', (done) => {
    request.get('/order_products').then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })
  it('gets the /order_products/:id endpoint', (done) => {
    request.get(`/order_products/${user_Id}`).then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })
  it('add methods test', async () => {
    const createUser: any = await userStore.create(userIn)
    user_Id = createUser.id
    order = {
      status: 'pending',
      user_id: user_Id,
    }
    const createOrder: any = await orderStore.create(order)
    const createProduct: any = await productStore.create(product)
    order_id = createOrder.id
    orderProduct = {
      quantity: '10',
      order_id: order_id,
      product_id: createProduct.id,
    }
    const createOrderProducts: any = await store.create(
      orderProduct.quantity,
      orderProduct.order_id,
      orderProduct.product_id
    )
    expect(createOrderProducts.quantity).toEqual(10)
    await store.delete(order_id.toString())
  })
  it('index methods test', async () => {
    const createUser: any = await userStore.create(userIn)
    user_Id = createUser.id
    order = {
      status: 'pending',
      user_id: user_Id,
    }
    const createOrder: any = await orderStore.create(order)
    const createProduct: any = await productStore.create(product)
    order_id = createOrder.id
    orderProduct = {
      quantity: '10',
      order_id: order_id,
      product_id: createProduct.id,
    }
    const createOrderProducts: any = await store.create(
      orderProduct.quantity,
      orderProduct.order_id,
      orderProduct.product_id
    )
    const indexOrderProducts: any = await store.index()
    expect(indexOrderProducts).toBeTruthy
    await store.delete(createOrderProducts.id.toString())
  })
})
