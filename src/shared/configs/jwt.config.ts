import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

const createJwtConfig = (config: ConfigService): JwtModuleOptions => ({
  secret: config.get<string>('JWT_SECRET'),
  signOptions: { expiresIn: config.get<string>('JWT_EXPIRED_IN') }
})

export { createJwtConfig }
