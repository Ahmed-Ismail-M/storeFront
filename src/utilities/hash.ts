import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const addedPassword: string| undefined = process.env.BCRYPT_PASSWORD
const saltRound: string = process.env.SALT_ROUND as string

export function hashPass (password:string): string {
  return bcrypt.hashSync(password + addedPassword, parseInt(saltRound))
}

export function comparePass (input_password:string, digest_password:string): boolean {
  return bcrypt.compareSync(input_password + addedPassword, digest_password)
}
