import { z } from "zod";
import {
  descriptionSchema,
  dueDateSchema,
  titleSchema,
} from "./base-task.schema";

const updateTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  dueDate: dueDateSchema,
});

type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;

export { updateTaskSchema };
export type { UpdateTaskFormData };
