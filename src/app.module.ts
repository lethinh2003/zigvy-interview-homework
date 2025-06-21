import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { validateEnv } from '@/shared/configs/env.config'
import { MongooseModule } from '@nestjs/mongoose'
import { createDatabaseConfig } from '@/shared/configs/database.config'
import { UserModule } from '@/modules/user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { createJwtConfig } from '@/shared/configs/jwt.config'
import { AuthModule } from '@/modules/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      validate: validateEnv
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: createDatabaseConfig
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: createJwtConfig,
      inject: [ConfigService]
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
