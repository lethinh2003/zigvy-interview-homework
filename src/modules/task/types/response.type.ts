import { SuccessResponse } from "@/shared/types";
import { Task, TaskDetails } from "./task.type";

type CreateTaskResponse = SuccessResponse<Task>;

type GetTasksResponse = SuccessResponse<TaskDetails[]>;

type UpdateTaskResponse = SuccessResponse<Task>;

type DeleteTaskResponse = SuccessResponse<null>;

export type {
  CreateTaskResponse,
  GetTasksResponse,
  UpdateTaskResponse,
  DeleteTaskResponse,
};
