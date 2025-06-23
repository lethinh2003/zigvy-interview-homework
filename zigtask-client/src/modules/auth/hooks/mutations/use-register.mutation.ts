import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { authApi } from "../../apis/auth.api";
import { RegisterBody } from "../../types/body.type";
import { RegisterResponse } from "../../types/response.type";

type UseRegisterMutationOptions = Omit<
  UseMutationOptions<AxiosResponse<RegisterResponse>, Error, RegisterBody>,
  "mutationFn"
>;

function useRegisterMutation(options?: UseRegisterMutationOptions) {
  return useMutation({
    mutationFn: (body: RegisterBody) => authApi.register(body),
    ...options,
  });
}

export { useRegisterMutation };
