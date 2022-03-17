import express, { Request, Response } from 'express'
import { User } from '../models/user'
import { UserStore } from '../datastore/userDS'
import { ExpressHandler } from '../models/handler'
import {
  GetUserRes,
  SignInReq,
  SignInRes,
  SignUpReq,
  SignUpRes
} from '../api/userAPI'
import { comparePass, issueToken } from '../utilities/security'
import { verifyAuthToken } from '../middlewares/auth'
const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index()
    res.json(users)
  } catch (error) {
    res.status(400)
    res.send({ error: (error as Error).message })
  }
}
const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id) as number)
    const userReq: GetUserRes = {
      first_name: user.first_name,
      last_name: user.last_name
    }
    res.json(userReq)
  } catch (error) {
    res.status(400)
    res.send({ error: (error as Error).message })
  }
}

const create: ExpressHandler<SignUpReq, SignUpRes> = async (req, res) => {
  try {
    if (!req.body.password || !req.body.first_name) {
      return res.status(400).send({ error: ' Missing inputs' })
    }
    const user: User = {
      first_name: req.body.first_name as string,
      last_name: req.body.last_name as string,
      password: req.body.password as string
    }
    const newUser = await store.create(user)
    const token = issueToken(
      {
        user: {
          id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name
        }
      },
      '1h'
    )
    const signupres: SignUpRes = {
      user: {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name
      },
      jwt: token
    }
    return res.status(200).send(signupres)
  } catch (err) {
    return res.status(400).send({ error: (err as Error).message })
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
  } catch (error) {
    res.status(400)
    res.send({ error: (error as Error).message })
  }
}

const signIn: ExpressHandler<SignInReq, SignInRes> = async (req, res) => {
  const { first_name, password } = req.body
  if (!first_name || !password) {
    return res.status(400).send({ error: 'missing inputs' })
  }
  const existing = await store.showByName(first_name)
  if (!existing) {
    return res.status(403).send({ error: 'user dosnt exist' })
  }
  if (!comparePass(password, existing.password)) {
    return res.status(403).send({ error: 'invalid password' })
  }
  const token = issueToken(existing, '1hr')
  return res.status(200).send({ jwt: token })
}
const update = async (_req: Request, res: Response) => {
  const user: User = {
    first_name: _req.body.first_name as string,
    last_name: _req.body.last_name as string,
    password: _req.body.password
  }
  try {
    const newUser = await store.update(_req.params.id, user)
    res.send({ user: newUser })
  } catch (error) {
    res.status(400)
    res.send({ error: (error as Error).message })
  }
}
const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', create)
  app.delete('/users', verifyAuthToken, destroy)
  app.post('/signin', signIn)
  app.put('/users/:id', verifyAuthToken, update)
}

export default userRoutes
