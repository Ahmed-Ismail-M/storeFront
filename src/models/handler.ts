import { RequestHandler } from 'express-serve-static-core'

type WithError<T> = T & { error: string }
export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>
