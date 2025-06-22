import { z } from "zod";

const titleSchema = z.string().trim().min(1, { message: "Title is required" });
const descriptionSchema = z.string().trim().optional();

const dueDateSchema = z.string().optional();

export { titleSchema, descriptionSchema, dueDateSchema };
