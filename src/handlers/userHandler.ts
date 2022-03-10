import express, { Request, Response } from 'express'
import { User } from '../models/user'
import { UserStore } from '../datastore/userDS'
import { ExpressHandler } from '../models/handler'
import { GetUserRes, SignInReq, SignInRes, SignUpReq, SignUpRes } from '../api/userAPI'
import { comparePass, issueToken } from '../utilities/security'
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
    const token = issueToken({ user: signupres }, '1s')
    res.json(token)
  } catch (err) {
    res.status(400)
    res.json(err as string)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id)
  res.json(deleted)
}

const signIn: ExpressHandler<SignInReq, SignInRes> = async (req, res) => {
  const { first_name, password } = req.body
  if (!first_name || !password) {
    return res.sendStatus(400)
  }
  const existing = await store.showByName(first_name)
  if (!existing || comparePass(password, existing.password)) {
    return res.sendStatus(403)
  }
  const token = issueToken(existing, '1hr')
  return res.status(200).json(token)
}

const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.delete('/users', destroy)
  app.post('/signin', signIn)
}

export default userRoutes
