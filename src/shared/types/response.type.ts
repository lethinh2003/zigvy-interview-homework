import { ResponseStatusCodeEnum } from "@/shared/enums/response.enum";

type SuccessResponse<T> = {
  data: T;
  message: string;
  status: ResponseStatusCodeEnum;
};

export type { SuccessResponse };
