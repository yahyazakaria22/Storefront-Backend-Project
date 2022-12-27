import Client from '../database/database'

export type Product = {
  name: string
  price: number
}
export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM Products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get Product. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM Products WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find Product ${id}. Error: ${err}`)
    }
  }

  async create(u: Product): Promise<Product> {
    try {
      const conn = await Client.connect()
      const sql = 'INSERT INTO Products (name,price) VALUES($1,$2) RETURNING *'
      const result = await conn.query(sql, [u.name, u.price])
      const Product = result.rows[0]
      conn.release()
      return Product
    } catch (err) {
      throw new Error(`unable create Product (${u.name}): ${err}`)
    }
  }
  async put(id: string, name: string, price: number): Promise<Product> {
    try {
      const sql = 'UPDATE Products SET name=($2),price=($3)  WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id, name, price])
      const Product = result.rows[0]
      conn.release()
      return Product
    } catch (err) {
      throw new Error(`Could not edit Product ${id}. Error: ${err}`)
    }
  }
  async delete(id: string): Promise<Product> {
    try {
      const sql = 'DELETE FROM Products WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      const Product = result.rows[0]
      conn.release()
      return Product
    } catch (err) {
      throw new Error(`Could not delete Product ${id}. Error: ${err}`)
    }
  }
}
