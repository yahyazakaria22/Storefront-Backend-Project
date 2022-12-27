import Client from '../database/database'

export type Order = {
  status: string
  user_id: string
}
export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get Order. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      console.log(id)
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find Order ${id}. Error: ${err}`)
    }
  }

  async create(u: Order): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1,$2) RETURNING *'
      const result = await conn.query(sql, [u.status, u.user_id])
      const Order = result.rows[0]
      conn.release()
      return Order
    } catch (err) {
      throw new Error(`unable create Order: ${err}`)
    }
  }
  async put(id: string, status: string, user_id: string): Promise<Order> {
    try {
      const sql = 'UPDATE orders SET status=($2),user_id=($3)  WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id, status, user_id])
      const Order = result.rows[0]
      conn.release()
      return Order
    } catch (err) {
      throw new Error(`Could not edit Order ${id}. Error: ${err}`)
    }
  }
  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      const Order = result.rows[0]
      conn.release()
      return Order
    } catch (err) {
      throw new Error(`Could not delete Order ${id}. Error: ${err}`)
    }
  }
}
