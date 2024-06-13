import express from "express";
import { BookingsControllers } from "./booking.controller";
import { checkAdmin, verifyToken } from "../../middlewares/auth";
import { BookingValidations } from "./booking.zod";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.get(
  "",
  verifyToken,
  checkAdmin,
  BookingsControllers.getAllBookingsController
);

router.post(
  "",
  verifyToken,
  validateRequest(BookingValidations.bookingCreateZodSchema),
  BookingsControllers.bookingACarController
);
router.get(
  "/my-bookings",
  verifyToken,
  BookingsControllers.getUserBookingsController
);
export const BookingRoutes = router;
