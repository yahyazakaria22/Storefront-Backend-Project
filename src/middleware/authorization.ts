import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()
const { TOKEN_SECRET } = process.env
const token_secret: string = TOKEN_SECRET || ''

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: () => void
) => {
  try {
    const authorizationHeader = req.headers.authorization || ''
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, token_secret)
    next()
  } catch (error) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
  }
}
