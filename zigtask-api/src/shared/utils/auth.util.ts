import * as bcrypt from 'bcrypt'

const saltOrRounds = 10
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltOrRounds)
}

const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword)
}

export { hashPassword, comparePassword }
