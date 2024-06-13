import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Booking from "./booking.model";
import { Request } from "express";
import Car from "../car/car.model";
import { IUser } from "../user/user.interface";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}
const getAllBookingsIntoDB = async (req: Request) => {
  const { carId, date } = req.query;
  const query: any = {};

  if (carId) query.car = carId;
  if (date) query.date = date;
  //   console.log(query);

  try {
    const bookings = await Booking.find(query).populate("user car");

    if (!bookings) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to fetch boking");
    }

    return bookings;
  } catch (err: any) {
    throw new Error(err);
  }
};
const bookingACarIntoDB = async (req: Request) => {
  const { carId, date, startTime } = req.body;
  const userId = req.user?._id;

  try {
    const car = await Car.findById(carId);

    if (!car || car.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, "Car not found");
    }

    // Check for overlapping bookings
    const existingBookings = await Booking.find({ car: carId, date });
    const newStartTimeHours =
      parseFloat(startTime.split(":")[0]) +
      parseFloat(startTime.split(":")[1]) / 60;
    for (const booking of existingBookings) {
      const bookingStartTimeHours =
        parseFloat(booking.startTime.split(":")[0]) +
        parseFloat(booking.startTime.split(":")[1]) / 60;
      const bookingEndTimeHours = booking.endTime
        ? parseFloat(booking.endTime.split(":")[0]) +
          parseFloat(booking.endTime.split(":")[1]) / 60
        : null;

      if (
        bookingStartTimeHours <= newStartTimeHours &&
        (!bookingEndTimeHours || bookingEndTimeHours > newStartTimeHours)
      ) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Car already booked for the overlapping time period"
        );
      }
    }

    const bookingData = new Booking({
      car: carId,
      date,
      startTime,
      user: userId,
    });
    const booking = await Booking.create(bookingData);
    return booking;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const BookingServices = {
  getAllBookingsIntoDB,
  bookingACarIntoDB,
};
