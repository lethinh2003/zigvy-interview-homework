import { ResponseStatus } from '../enums/response.enum'

type SuccessResponse<T> = {
  status: ResponseStatus.SUCCESS
  message: string
  result: T
}

type ErrorResponse = {
  status: ResponseStatus.FAILED
  message: string
  error: any
  error_code: string
  path: string
  method: string
  timestamp: string
}

export type { ErrorResponse, SuccessResponse }
