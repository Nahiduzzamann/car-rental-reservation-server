import { Types } from "mongoose";
import { z } from "zod";

const carCreateZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    color: z.string().min(1, { message: "Color is required" }),
    isElectric: z.boolean({ required_error: "isElectric is required" }),
    status: z.enum(["available", "unavailable"]).optional(),
    features: z
      .array(z.string())
      .nonempty({ message: "Features must be a non-empty array" }),
    pricePerHour: z
      .number()
      .positive({ message: "Price per hour must be a positive number" }),
    isDeleted: z.boolean().optional(),
  }),
});
const updateCarZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    description: z.string().min(1, { message: "Description is required" }).optional(),
    color: z.string().min(1, { message: "Color is required" }).optional(),
    isElectric: z.boolean({ required_error: "isElectric is required" }).optional(),
    status: z.enum(["available", "unavailable"]).optional().optional(),
    features: z
      .array(z.string())
      .nonempty({ message: "Features must be a non-empty array" }).optional(),
    pricePerHour: z
      .number()
      .positive({ message: "Price per hour must be a positive number" }).optional(),
    isDeleted: z.boolean().optional().optional(),
  }),
});
const CarReturnZodSchema = z.object({
  body: z.object({
    bookingId: z
      .string()
      .nonempty("bookingId ID is required")
      .refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid bookingId ID",
      }),
    endTime: z.string().nonempty("End time is required"),
  }),
});

export const CarValidations = {
  carCreateZodSchema,
  updateCarZodSchema,
  CarReturnZodSchema
};
