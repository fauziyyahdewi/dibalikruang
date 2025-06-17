// RegisterSchema.ts
import { object, string } from "zod";

export const SigninSchema = object({
  email: string().email("Invalid Email"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const SignUpSchema = object({
  name: string().min(1, "Last name is required"),
  email: string().email("Invalid email address"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be less than 32 characters"),
});
