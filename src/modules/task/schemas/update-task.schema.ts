import { z } from "zod";
import {
  descriptionSchema,
  dueDateSchema,
  prioritySchema,
  statusSchema,
  titleSchema,
} from "./base-task.schema";

const updateTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  dueDate: dueDateSchema,
  status: statusSchema,
  priority: prioritySchema,
});

type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;

export { updateTaskSchema };
export type { UpdateTaskFormData };
