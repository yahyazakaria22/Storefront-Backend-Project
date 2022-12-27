import Client from '../database/database'

export type OrderProducts = {
  quantity: string
  order_id: number
  product_id: number
}
export class OrderProductsStore {
  async index(): Promise<OrderProducts[]> {
    try {
      const sql = 'SELECT * FROM order_products'
      const conn = await Client.connect()
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get OrderProducts. Error: ${err}`)
    }
  }

  async show(id: string): Promise<OrderProducts> {
    try {
      const sql = 'SELECT * FROM order_products WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find OrderProducts ${id}. Error: ${err}`)
    }
  }

  async create(
    quantity: string,
    order_id: number,
    product_id: number
  ): Promise<OrderProducts> {
    try {
      const sql =
        'INSERT INTO order_products (quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING *'
      const conn = await Client.connect()
      const result = await conn.query(sql, [quantity, order_id, product_id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`unable create OrderProducts: ${err}`)
    }
  }
  async put(
    id: string,
    quantity: string,
    order_id: number,
    product_id: number
  ): Promise<OrderProducts> {
    try {
      const sql =
        'UPDATE order_products SET quantity=($2),order_id=($3),product_id=($4)  WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id, quantity, order_id, product_id])
      const OrderProducts = result.rows[0]
      conn.release()
      return OrderProducts
    } catch (err) {
      throw new Error(`Could not edit OrderProducts ${id}. Error: ${err}`)
    }
  }
  async delete(id: string): Promise<OrderProducts> {
    try {
      const sql = 'DELETE FROM order_products WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      const OrderProducts = result.rows[0]
      conn.release()
      return OrderProducts
    } catch (err) {
      throw new Error(`Could not delete OrderProducts ${id}. Error: ${err}`)
    }
  }
}
