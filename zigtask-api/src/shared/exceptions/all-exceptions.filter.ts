import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

import { errorResponse } from '@/shared/utils/response.util'
import { CustomHttpException } from '@/shared/exceptions/custom.exception'

@Catch()
class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status: number
    let error: string
    let error_code: string

    if (exception instanceof CustomHttpException) {
      status = exception.getStatus()
      error = exception.message
      error_code = exception.error_code
    } else if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST
      const exceptionResponse = exception.getResponse() as any

      if (Array.isArray(exceptionResponse.message)) {
        error = exceptionResponse.message
        error_code = 'VALIDATION_ERROR'
      } else {
        error = exceptionResponse.message || exception.message
        error_code = 'BAD_REQUEST'
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse() as any
      error = exceptionResponse.message || exception.message
      error_code = exceptionResponse.error_code || 'UNKNOWN_ERROR'
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR
      error = exception instanceof Error ? exception.message : 'Internal server error'
      error_code = 'INTERNAL_SERVER_ERROR'
    }

    response.status(status).json(
      errorResponse({
        message: 'failed',
        error,
        error_code,
        path: request.url,
        method: request.method,
        timestamp: new Date().toISOString()
      })
    )
  }
}

export { AllExceptionsFilter }
