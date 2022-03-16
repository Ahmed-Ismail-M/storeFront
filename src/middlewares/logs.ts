import express from 'express'

export const logger = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const url = req.url
  const vipd = req.ip.replace('::fff:', '')
  const host = req.hostname
  const method = req.method
  const status = res.statusCode
  console.log(
    method + ' ' + status + ' ' + host + url + ' ' + vipd + ' ' + Date()
  )

  next()
}
export function asyncWrapper(fn: Function) {
  return (req: express.Request, res: express.Response, next: Function) => {
    return (
      Promise.resolve(fn(req, res))
        // .then((result) => res.send(result))
        .catch((err) => res.status(500).send(`${err}`))
    )
  }
}
