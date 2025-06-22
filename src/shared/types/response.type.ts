import { ResponseStatusCodeEnum } from "@/shared/enums";

type SuccessResponse<T> = {
  result: T;
  message: string;
  status: ResponseStatusCodeEnum;
};

type ErrorResponse = {
  status: ResponseStatusCodeEnum;
  message: string;
  error: unknown;
  error_code: string;
  path: string;
  method: string;
  timestamp: string;
};

export type { SuccessResponse, ErrorResponse };
