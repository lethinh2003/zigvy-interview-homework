import { UserDetails } from "@/modules/user/types/user.type";
import { TaskStatus } from "../enums";

type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  status: TaskStatus;
  priority: number;
};

type TaskDetails = Task & {
  user: UserDetails;
};

export type { Task, TaskDetails };
