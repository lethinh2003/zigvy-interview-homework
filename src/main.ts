import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { GlobalResponseInterceptor } from '@/shared/interceptors/global-response.interceptor'
import { LoggingInterceptor } from '@/shared/interceptors/logging.interceptor'
import { AllExceptionsFilter } from '@/shared/exceptions/all-exceptions.filter'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  )

  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalInterceptors(new GlobalResponseInterceptor())
  app.useGlobalFilters(new AllExceptionsFilter())

  const port = configService.get('PORT')
  await app.listen(port)
}
bootstrap()
