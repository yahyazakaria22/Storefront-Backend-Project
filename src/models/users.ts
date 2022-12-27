import dotenv from 'dotenv'
import Client from '../database/database'
import bcrypt from 'bcrypt'

dotenv.config()
const { BYCRPT_PASSWORD, SALT_ROUNDS } = process.env
const saltRounds: string = SALT_ROUNDS || ''
const pepper: string = BYCRPT_PASSWORD || ''

export type User = {
  username: string
  password: string
}
export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get user. Error: ${err}`)
    }
  }
  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }
  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect()
      const sql =
        'INSERT INTO users (username,password_digest) VALUES($1,$2) RETURNING *'
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds))
      const result = await conn.query(sql, [u.username, hash])
      const user = result.rows[0]
      conn.release()
      return user
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`)
    }
  }
  async put(id: string, username: string, password: string): Promise<User> {
    try {
      const sql =
        'UPDATE users SET username=($2),password_digest=($3)  WHERE id=($1)'
      const conn = await Client.connect()
      const hash = bcrypt.hashSync(password + pepper, parseInt(saltRounds))
      const result = await conn.query(sql, [id, username, hash])
      const User = result.rows[0]
      conn.release()
      return User
    } catch (err) {
      throw new Error(`Could not edit User ${id}. Error: ${err}`)
    }
  }
  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      const User = result.rows[0]
      conn.release()
      return User
    } catch (err) {
      throw new Error(`Could not delete User ${id}. Error: ${err}`)
    }
  }
  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect()
    const sql = 'SELECT password_digest FROM users WHERE username=($1)'
    const result = await conn.query(sql, [username])
    console.log(password + pepper)
    if (result.rows.length) {
      const user = result.rows[0]
      console.log(user)
      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user
      }
    }
    return null
  }
}
