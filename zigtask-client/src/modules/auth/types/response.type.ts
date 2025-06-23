import { UserDetails } from "@/modules/user/types/user.type";
import { SuccessResponse } from "@/shared/types";

type LoginResponse = SuccessResponse<{
  user: UserDetails;
  access_token: string;
}>;

type RegisterResponse = SuccessResponse<{
  user: UserDetails;
  access_token: string;
}>;

export type { LoginResponse, RegisterResponse };
