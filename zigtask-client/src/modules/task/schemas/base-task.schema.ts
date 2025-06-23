import { z } from "zod";
import { TaskStatus } from "../enums";

const titleSchema = z.string().trim().min(1, { message: "Title is required" });
const descriptionSchema = z.string().trim().optional();

const dueDateSchema = z.string().optional();

const statusSchema = z.nativeEnum(TaskStatus);

const prioritySchema = z.number().min(1);

export {
  titleSchema,
  descriptionSchema,
  dueDateSchema,
  statusSchema,
  prioritySchema,
};
