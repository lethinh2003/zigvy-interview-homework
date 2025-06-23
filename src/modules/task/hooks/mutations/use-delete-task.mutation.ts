import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { taskApi } from "../../apis/task.api";
import { DeleteTaskResponse } from "../../types/response.type";

type UseDeleteTaskMutationOptions = Omit<
  UseMutationOptions<AxiosResponse<DeleteTaskResponse>, Error, { id: string }>,
  "mutationFn"
>;

function useDeleteTaskMutation(options?: UseDeleteTaskMutationOptions) {
  return useMutation({
    mutationFn: ({ id }) => taskApi.deleteTask(id),
    ...options,
  });
}

export { useDeleteTaskMutation };
