import { User } from '../models/user'

export type SignUpReq = Pick<User, 'first_name' | 'last_name' | 'password'>
export type SignUpRes = {
  user: Pick<User, 'first_name' | 'last_name' | 'id'>
  jwt: string
}
export type DeleteUserReq = Pick<User, 'id'>
export interface DeleteUserRes {}
export type GetUserReq = Pick<User, 'id'>
export type GetUserRes = Pick<User, 'first_name' | 'last_name'>
export type SignInReq = Pick<User, 'first_name' | 'password'>
export type SignInRes = { jwt: string }
