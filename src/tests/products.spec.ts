/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product, ProductStore } from '../models/products'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/users'
import dotenv from 'dotenv'
import supertest from 'supertest'
import app from '../index'
const request = supertest(app)

dotenv.config()
const { TOKEN_SECRET } = process.env
const token_secret: string = TOKEN_SECRET || ''

const store = new ProductStore()
const userStore = new UserStore()

describe('Product Model', () => {
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
describe('Product CRUD', () => {
  const product: Product = {
    name: 'product1',
    price: 10,
  }
  let token: string, user_Id: number, product_Id: number
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
  it('gets the /products endpoint', (done) => {
    request.get('/products').then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })
  it('gets the /products/:id endpoint', (done) => {
    request.get(`/products/${user_Id}`).then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })
  it('add method test', async () => {
    const createProduct: any = await store.create(product)
    product_Id = createProduct.id
    expect(createProduct).toEqual({
      id: product_Id,
      ...product,
    })
    await store.delete(product_Id.toString())
  })
  it('index method test', async () => {
    const createProduct: any = await store.create(product)
    const products = await store.index()
    product_Id = createProduct.id
    expect(products).toBeTruthy
    await store.delete(product_Id.toString())
  })
  it('show method test', async () => {
    const createProduct: any = await store.create(product)
    product_Id = createProduct.id
    const productShow = await store.show(product_Id.toString())
    expect(productShow).toEqual(createProduct)
    await store.delete(product_Id.toString())
  })
  it('update method test', async () => {
    const createProduct: any = await store.create(product)
    product_Id = createProduct.id
    const newProduct: Product = {
      name: 'productUpdated',
      price: 105,
    }
    await store.put(product_Id.toString(), newProduct.name, newProduct.price)
    const productShow = await store.show(product_Id.toString())
    expect(productShow.name).toEqual(newProduct.name)
    expect(productShow.price).toEqual(newProduct.price)
    await store.delete(product_Id.toString())
  })
  it('delete method test', async () => {
    const createProduct: any = await store.create(product)
    product_Id = createProduct.id
    await store.delete(product_Id.toString())
    const productShow = await store.show(product_Id.toString())
    expect(productShow).toBeNull
    await store.delete(product_Id.toString())
  })
})
