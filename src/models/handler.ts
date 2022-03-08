import { RequestHandler } from 'express-serve-static-core';

export type ExpressHandler<Req, Res> = RequestHandler<
string, Partial<Res>,
Partial<Req>, any>;
