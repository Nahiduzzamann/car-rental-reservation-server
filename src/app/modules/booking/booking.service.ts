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
const getUserBookingsIntoDB = async (req: Request) => {
  const userId = req.user?._id;
  console.log(userId);

  try {
    const bookings = await Booking.find({ user: userId }).populate("user car");

    if (!bookings) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to fetch boking");
    }

    return bookings;
  } catch (err: any) {
    throw new Error(err);
  }
};
const carReturnIntoDB = async (req: Request) => {
  const { bookingId, endTime } = req.body;

  try {
    const bookingData = await Booking.findById(bookingId).populate('user car');

    if (!bookingData) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    // Validate startTime and endTime
    const startTimeHours =
      parseFloat(bookingData.startTime.split(':')[0]) +
      parseFloat(bookingData.startTime.split(':')[1]) / 60;
    const endTimeHours =
      parseFloat(endTime.split(':')[0]) + parseFloat(endTime.split(':')[1]) / 60;

    if (startTimeHours > endTimeHours) {
      throw new AppError(httpStatus.BAD_REQUEST, 'End time must be greater than start time');
    }

    // Update booking data
    bookingData.endTime = endTime;
    const duration = endTimeHours - startTimeHours;

    if (!bookingData.car || typeof bookingData.car === 'string') {
      throw new AppError(httpStatus.BAD_REQUEST, 'Car details not available');
    }

    const car = bookingData.car as any; // Casting to any for simplicity, should be properly typed
    bookingData.totalCost = duration * car.pricePerHour;

    // Update car status to available
    await Car.findByIdAndUpdate(bookingData.car._id, { status: 'available' });

    // Save updated booking data
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, bookingData, {
      new: true,
      runValidators: true,
    }).populate('user car');

    return updatedBooking;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
const bookingACarIntoDB = async (req: Request) => {
  const { carId, date, startTime } = req.body;
  const userId = req.user?._id;

  try {
    const car = await Car.findById(carId);

    if (!car || car.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, "Car not found");
    }
    if (car.status !== "available") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Car is not available for booking"
      );
    }

    const bookingData = new Booking({
      car: carId,
      date,
      startTime,
      user: userId,
    });
    const upDateCar = await Car.findByIdAndUpdate(bookingData.car._id, {
      status: "unavailable",
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
  getUserBookingsIntoDB,
  carReturnIntoDB,
};
