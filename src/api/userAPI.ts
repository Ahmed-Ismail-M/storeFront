import { User } from '../models/user';

export type SignUpReq = Pick<User, 'first_name'|'last_name'| 'password'>
export type SignUpRes = Pick<User, 'first_name'|'last_name'| 'id'>
export type DeleteUserReq = Pick<User, 'id'>
export interface DeleteUserRes {}
