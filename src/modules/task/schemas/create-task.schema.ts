import { z } from "zod";
import {
  descriptionSchema,
  dueDateSchema,
  titleSchema,
} from "./base-task.schema";

const createTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  dueDate: dueDateSchema,
});
type CreateTaskFormData = z.infer<typeof createTaskSchema>;

export { createTaskSchema };
export type { CreateTaskFormData };
