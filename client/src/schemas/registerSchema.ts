import { z } from "zod";

export const registerShema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z.string().min(1, "Email is required").email("Enter valid email"),

  password: z.string().min(6, "Password must be at least 6 characters")
  .regex(/[A-Z]/, "At least one uppercase letter required")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "At least one special character required"),

  city: z.string().min(1, "City is required")
});

export type RegisterFormData = z.infer<typeof registerShema>