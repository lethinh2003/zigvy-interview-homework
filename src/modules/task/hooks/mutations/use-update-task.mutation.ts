import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { taskApi } from "../../apis/task.api";
import { UpdateTaskBody } from "../../types/body.type";
import { UpdateTaskResponse } from "../../types/response.type";

type UseUpdateTaskMutationOptions = Omit<
  UseMutationOptions<
    AxiosResponse<UpdateTaskResponse>,
    Error,
    { id: string; body: UpdateTaskBody }
  >,
  "mutationFn"
>;

function useUpdateTaskMutation(options?: UseUpdateTaskMutationOptions) {
  return useMutation({
    mutationFn: ({ id, body }) => taskApi.updateTask(id, body),
    ...options,
  });
}

export { useUpdateTaskMutation };
