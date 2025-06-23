import { HttpException, HttpStatus } from '@nestjs/common'

type Options = {
  message: string
  status: HttpStatus
  error_code: string
}

class CustomHttpException extends HttpException {
  public readonly error_code: string

  constructor(options: Options) {
    const { message, status, error_code } = options
    super({ message, error_code }, status)
    this.error_code = error_code
  }
}

export { CustomHttpException }
