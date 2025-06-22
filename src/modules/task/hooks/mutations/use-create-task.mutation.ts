import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { CreateTaskResponse } from "../../types/response.type";
import { CreateTaskBody } from "../../types/body.type";
import { taskApi } from "../../apis/task.api";

type UseCreateTaskMutationOptions = Omit<
  UseMutationOptions<AxiosResponse<CreateTaskResponse>, Error, CreateTaskBody>,
  "mutationFn"
>;

function useCreateTaskMutation(options?: UseCreateTaskMutationOptions) {
  return useMutation({
    mutationFn: (body: CreateTaskBody) => taskApi.createTask(body),
    ...options,
  });
}

export { useCreateTaskMutation };
