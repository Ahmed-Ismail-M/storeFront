import express from 'express'
import ToDo from './api/todo'

const routes: express.Router = express.Router()
routes.get('/', (req: express.Request, res: express.Response): void => {
  res.status(200).send('Hi from main')
})
routes.use('/todo', ToDo)

export default routes
