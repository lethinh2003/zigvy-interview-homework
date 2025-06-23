import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name)

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handlerName = `${context.getClass().name}.${context.getHandler().name}`
    this.logger.debug(`🚀 [START] Handling: ${handlerName}`)

    const now = Date.now()

    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - now
        this.logger.debug(`✅ [DONE] ${handlerName} - Completed in ${elapsed}ms`)
      })
    )
  }
}

export { LoggingInterceptor }
