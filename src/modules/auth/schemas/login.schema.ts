import { z } from "zod";
import { emailSchema, passwordSchema } from "./base-auth.schema";

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
type LoginFormData = z.infer<typeof loginSchema>;

export { loginSchema };
export type { LoginFormData };
