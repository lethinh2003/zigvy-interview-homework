import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { successResponse } from '@/shared/utils/response.util'

@Injectable()
class GlobalResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        const message = data?.message || 'success'
        const responseData = data?.data ?? data

        return successResponse({
          message,
          result: responseData
        })
      })
    )
  }
}

export { GlobalResponseInterceptor }
