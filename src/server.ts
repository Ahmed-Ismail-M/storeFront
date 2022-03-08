import Express from 'express'
import { logger } from './middlewares/logs'
import errHandler from './middlewares/errors'
import path from 'path'
import bodyParser from 'body-parser'
import productRoutes from './handlers/productHandler'
import userRoutes from './handlers/userHandler'
import orderRoutes from './handlers/orderHandler'

const app: Express.Application = Express()
const port: number = 8000
const staticCashe = Express.static(path.join(process.cwd(), 'assets'), {
  maxAge: 90000000
})
const middleware = [staticCashe, logger, Express.json()]
app.use(middleware)
productRoutes(app)
userRoutes(app)
orderRoutes(app)
// app.use('/api', routes)
app.use(errHandler)
app.use(bodyParser.json())
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
module.exports = app
