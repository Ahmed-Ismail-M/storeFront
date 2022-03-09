import express, { Request, Response } from 'express'
import { User } from '../models/user'
import { UserStore } from '../datastore/userDS'
import { ExpressHandler } from '../models/handler'
import { GetUserRes, SignUpReq, SignUpRes } from '../api/userAPI'
const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}
const show = async (req: Request, res: Response) => {
  const user = await store.show(parseInt(req.params.id) as number)
  const userReq: GetUserRes = {
    first_name: user.first_name,
    last_name: user.last_name
  }
  res.json(userReq)
}

const create: ExpressHandler<SignUpReq, SignUpRes | {}> = async (req, res) => {
  try {
    const user: User = {
      first_name: req.body.first_name as string,
      last_name: req.body.last_name as string,
      password: req.body.password as string
    }

    const newUser = await store.create(user)
    const signupres: SignUpRes = {
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name
    }
    res.send({ signupres })
  } catch (err) {
    res.status(400)
    res.json(err as string)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id)
  res.json(deleted)
}

const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.delete('/users', destroy)
}

export default userRoutes
