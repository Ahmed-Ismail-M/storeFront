import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
dotenv.config()
const addedPassword: string = process.env.BCRYPT_PASSWORD as string
const saltRound: string = process.env.SALT_ROUND as string
const secretToken: string = process.env.TOKEN_SECRET as string

export function hashPass (password:string): string {
  return bcrypt.hashSync(password + addedPassword, parseInt(saltRound))
}

export function comparePass (input_password:string, digest_password:string): boolean {
  return bcrypt.compareSync(input_password + addedPassword, digest_password)
}

export function issueToken (payload: object, expire: string): string {
  return jwt.sign(payload, secretToken, { expiresIn: expire })
}
export function verifyToken (token:string): string | JwtPayload {
  return jwt.verify(token, secretToken)
}
