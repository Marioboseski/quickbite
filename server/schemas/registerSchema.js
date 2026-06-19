import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name required"),

  email: z.string().min(1, "Email required").email("Enter valid email"),

  password: z.string().min(6, "Password must be atleast 6 characters")
  .regex(/[A-Z]/, "Atleast one uppercase letter required")
  .regex( /[!@#$%^&*(),.?":{}|<>]/, "Atleast one special character required"),

  city: z.string().min(1, "City is required")
});