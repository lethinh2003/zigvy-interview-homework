import { TaskStatus } from "../enums";

type GetTasksParam = {
  title?: string;
  dueDate?: string;
  status?: TaskStatus;
};

export type { GetTasksParam };
