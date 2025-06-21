import { plainToInstance } from 'class-transformer'
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator'

class EnvironmentVariables {
  @IsEnum(['development', 'production', 'test'])
  NODE_ENV: string

  @IsNumber()
  PORT: number

  @IsString()
  CLIENT_URL: string

  @IsString()
  JWT_SECRET: string

  @IsString()
  DATABASE_URL: string
}

function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true })
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}

export { validateEnv }
