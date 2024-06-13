import { Types } from "mongoose";
import { z } from "zod";

const bookingCreateZodSchema = z.object({
  body: z.object({
    date: z.string().nonempty("Date is required"),
    carId: z
      .string()
      .nonempty("Car ID is required")
      .refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid Car ID",
      }),
    startTime: z.string().nonempty("Start time is required"),
  }),
});

export const BookingValidations = {
  bookingCreateZodSchema,
};
