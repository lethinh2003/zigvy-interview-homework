import { UserDetails } from "@/modules/user/types/user.type";
import { SuccessResponse } from "@/shared/types/response.type";

type LoginResponse = SuccessResponse<{
  user: UserDetails;
  accessToken: string;
}>;

export type { LoginResponse };
