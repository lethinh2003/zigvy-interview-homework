import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Connection } from 'mongoose'

const logger = new Logger('DatabaseConfig')

const createConnectionFactory = (connection: Connection) => {
  connection.on('connecting', () => {
    logger.verbose('Database connecting...')
  })

  connection.on('connected', () => {
    logger.verbose('Database connected successfully')
  })

  connection.on('disconnected', () => {
    logger.warn('Database connection lost, attempting to reconnect...')
  })

  return connection
}

const createDatabaseConfig = (config: ConfigService) => ({
  uri: config.get<string>('DATABASE_URL'),
  connectionFactory: createConnectionFactory
})

export { createDatabaseConfig }
