import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { authApi } from "../../apis/auth.api";
import { LoginResponse } from "../../types/response.type";
import { LoginBody } from "../../types/body.type";

type UseLoginMutationOptions = Omit<
  UseMutationOptions<AxiosResponse<LoginResponse>, Error, LoginBody>,
  "mutationFn"
>;

function useLoginMutation(options?: UseLoginMutationOptions) {
  return useMutation({
    mutationFn: (body: LoginBody) => authApi.login(body),
    ...options,
  });
}

export { useLoginMutation };
