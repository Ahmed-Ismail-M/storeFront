import express from 'express'
import { verifyToken } from '../utilities/security'

export const verifyAuthToken = (req: express.Request, res: express.Response, next: Function) => {
  try {
    const authorizationHeader = req.headers.authorization
    console.log(authorizationHeader + ' FROM AUTHHEADER')
    if (authorizationHeader) {
      console.log(authorizationHeader)
      const token = authorizationHeader.split(' ')[1]
      console.log(token)
      const decoded = verifyToken(token)
      console.log(decoded)
      next()
    }
    console.log(authorizationHeader + ' FROM AFTER IF')
    return res.status(401).send('not authorized')
  } catch (error) {
    res.status(401).json(error)
  }
}
