import { ResponseStatus } from '../enums/response.enum'

import { ErrorResponse, SuccessResponse } from '../types/response.type'

function successResponse<T>(response: Omit<SuccessResponse<T>, 'status'>) {
  return {
    ...response,
    status: ResponseStatus.SUCCESS
  }
}

function errorResponse(response: Omit<ErrorResponse, 'status'>) {
  return {
    ...response,
    status: ResponseStatus.FAILED
  }
}

export { errorResponse, successResponse }
