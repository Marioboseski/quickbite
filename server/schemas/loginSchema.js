import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email required").email("Enter valid email"),

  password: z.string().min(1, "Password required"),
})