import { UserDetails } from "@/modules/user/types/user.type";
import { TaskStatus } from "../enums";

type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  status: TaskStatus;
};

type TaskDetails = Task & {
  user: UserDetails;
};

export type { Task, TaskDetails };
