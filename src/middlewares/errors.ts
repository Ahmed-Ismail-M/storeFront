import type { ErrorRequestHandler } from 'express'
import express from 'express'
const errHandler: ErrorRequestHandler = (
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: Function
): express.Response => {
  console.error('uncaught exception', err)
  return res.status(500).send('an unexpected error has occured ')
}

export default errHandler
