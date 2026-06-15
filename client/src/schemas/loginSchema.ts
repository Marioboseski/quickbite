import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required")
  .email("Enter valid email"),

  password: z 
  .string().min(1, "Password is required")
  .min(6, "Password must be atleast 6 characters")
  .regex(/[A-Z]/, "At least one uppercase letter required")
  .regex(/[!@#$%^&*(),.?":{}|<>]/,"At least one special character required")
})

export type LoginFormData = z.infer<typeof loginSchema>