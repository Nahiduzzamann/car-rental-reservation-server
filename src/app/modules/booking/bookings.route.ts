import express from "express";
import { BookingsControllers } from "./booking.controller";
import { checkAdmin, verifyToken } from "../../middlewares/auth";

const router = express.Router();

router.get(
  "",
  verifyToken,
  checkAdmin,
  BookingsControllers.getAllBookingsController
);

router.post("", verifyToken, BookingsControllers.bookingACarController);
router.get(
  "/my-bookings",
  verifyToken,
  BookingsControllers.getUserBookingsController
);
export const BookingRoutes = router;
