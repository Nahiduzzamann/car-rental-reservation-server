import { z } from "zod";

const userZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    role: z.enum(["user", "admin"]).optional(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    address: z.string().min(1, { message: "Address is required" }),
  }),
});
const userSignInZodSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  }),
});

export const UserValidations = {
  userZodSchema,
  userSignInZodSchema
};
