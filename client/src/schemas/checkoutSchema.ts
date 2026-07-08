import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().trim().
    min(2, "Full name must contain al least 2 characters").
    max(30, "Full name cannot exceed 30 characters").
    regex(/^[A-Za-zÀ-ÿЀ-ӿ\s'-]+$/, "Full name can only contain letters"),

  phoneNumber: z.string().trim()
    .regex(/^[\d\s-]+$/, "Phone number can contain only digits, spaces and hyphens")
    .transform(value => value.replace(/[\s-]/g, ""))
    .pipe(z.string().min(8, "Phone number must contain at least 8 digits")
      .max(15, "Phone number is too long")
    ),

  address: z.string().min(1, "Address required").trim().
    min(5, "Address must contain at least 5 characters").
    max(100, "Address cannot exceed 100 characters"),

  paymentMethod: z.enum(
    ["cash", "card"],
    {
      message: "Please select payment method"
    }
  )
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>