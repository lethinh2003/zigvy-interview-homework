import { z } from "zod";
import { emailSchema, passwordSchema } from "./base-auth.schema";

const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type RegisterFormData = z.infer<typeof registerSchema>;

export { registerSchema };
export type { RegisterFormData };
