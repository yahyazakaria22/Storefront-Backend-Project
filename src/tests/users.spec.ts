/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/users'
import dotenv from 'dotenv'
import supertest from 'supertest'
import app from '../index'
const request = supertest(app)

dotenv.config()
const { TOKEN_SECRET } = process.env
const token_secret: string = TOKEN_SECRET || ''

const store = new UserStore()

describe('User Model', () => {
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
describe('User CRUD', () => {
  let token: string, user_Id: number, userIn_Id: number
  const userIn2: User = {
    username: 'test2',
    password: '1232',
  }
  beforeAll(async () => {
    const userIn: User = {
      username: 'test',
      password: '123',
    }
    const { body: Body } = await request.post('/users').send(userIn)
    token = Body
    const { user }: any = jwt.verify(token, token_secret)
    userIn_Id = user.id
  })
  afterAll(async () => {
    await request
      .delete(`/users/${userIn_Id}`)
      .set('Authorization', 'bearer ' + token)
  })
  it('gets the /users endpoint', (done) => {
    request.get('/users').then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })
  it('gets the /users/:id endpoint', (done) => {
    request.get(`/users/${userIn_Id}`).then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })
  it('add method test', async () => {
    const createUser: any = await store.create(userIn2)
    user_Id = createUser.id
    expect(createUser.username).toEqual(userIn2.username)
    await store.delete(user_Id.toString())
  })
  it('index method test', async () => {
    const createUser: any = await store.create(userIn2)
    const users = await store.index()
    expect(users).toBeDefined
    await store.delete(user_Id.toString())
  })
  it('show method test', async () => {
    const createUser: any = await store.create(userIn2)
    user_Id = createUser.id
    const userShow = await store.show(user_Id.toString())
    expect(userShow).toEqual(createUser)
    await store.delete(user_Id.toString())
  })
  it('update method test', async () => {
    const createUser: any = await store.create(userIn2)
    user_Id = createUser.id
    const newUser: User = {
      username: 'userUpdated',
      password: '1234',
    }
    await store.put(user_Id.toString(), newUser.username, newUser.password)
    const userShow = await store.show(user_Id.toString())
    expect(userShow.username).toEqual(newUser.username)
    await store.delete(user_Id.toString())
  })
  it('delete method test', async () => {
    const createUser: any = await store.create(userIn2)
    user_Id = createUser.id
    await store.delete(user_Id.toString())
    const userShow = await store.show(user_Id.toString())
    expect(userShow).toBeNull
    await store.delete(user_Id.toString())
  })
})
