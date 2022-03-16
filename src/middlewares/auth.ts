import express from 'express'
import { verifyToken } from '../utilities/security'

export const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  const authorizationHeader = req.headers.authorization
  const token = authorizationHeader?.split(' ')[1]
  if (!token) {
    return res.status(401).send('not authorized')
  }
  try {
    const payload = verifyToken(token)
    console.log(payload)
    next()
  } catch (error) {
    res.status(401).json(error)
  }
}
