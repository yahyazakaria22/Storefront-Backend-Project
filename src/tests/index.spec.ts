import supertest from 'supertest'
import app from '../index'

const request = supertest(app)
describe('Test main endpoint responses', () => {
  it('gets the api main endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})
