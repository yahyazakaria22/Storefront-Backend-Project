import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import userRoutes from './handlers/users'
import bodyParser from 'body-parser'
import ProductRoutes from './handlers/products'
import OrderRoutes from './handlers/orders'
import OrderProductRoutes from './handlers/order_products'
import cors from 'cors'
dotenv.config()
const PORT = process.env.PORT || 3000
const app: Application = express()
app.use(bodyParser.json())
app.use(morgan('dev'))
userRoutes(app)
ProductRoutes(app)
OrderRoutes(app)
OrderProductRoutes(app)
const corsOption = {
  optionsSuccessStatus: 200, // for some lagacy browsers
}
app.use(cors(corsOption))
app.get('/', async (req: Request, res: Response) => {
  res.json({ text: 'Hello Main route' })
})
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})
export default app
