import { z } from "zod";

const emailSchema = z.string().trim().email({ message: "Invalid email" });
const passwordSchema = z
  .string()
  .trim()
  .min(5, { message: "Password must be at least 5 characters" })
  .max(20, { message: "Password must be less than 20 characters" })
  .regex(/^[a-zA-Z0-9]+$/, {
    message: "Password must contain only letters and numbers",
  });

export { emailSchema, passwordSchema };
