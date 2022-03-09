import express from 'express'
import { verifyToken } from '../utilities/security'

export const verifyAuthToken = (req: express.Request, res: express.Response, next: Function) => {
  try {
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]
    const decoded = verifyToken(token)
    console.log(decoded)
    next()
  } catch (error) {
    res.status(401)
  }
}
