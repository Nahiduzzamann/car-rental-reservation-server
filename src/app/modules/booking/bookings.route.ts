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
export const BookingRoutes = router;
