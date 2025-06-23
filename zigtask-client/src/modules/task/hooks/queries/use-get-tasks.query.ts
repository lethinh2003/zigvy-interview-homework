import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { taskApi } from "../../apis/task.api";
import { GetTasksParam } from "../../types/param.type";
import { GetTasksResponse } from "../../types/response.type";

type Options = Omit<
  UseQueryOptions<
    AxiosResponse<GetTasksResponse>,
    Error,
    AxiosResponse<GetTasksResponse>,
    QueryKey
  >,
  "queryKey" | "queryFn"
>;

export function useGetTasksQuery(params: GetTasksParam, options?: Options) {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: () => taskApi.getTasks(params),
    ...options,
  });
}
