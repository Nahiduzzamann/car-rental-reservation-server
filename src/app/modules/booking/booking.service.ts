import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Booking from "./booking.model";
import { Request } from "express";
import Car from "../car/car.model";
import { IUser } from "../user/user.interface";
import mongoose from "mongoose";

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
  // console.log(userId);

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

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bookingData = await Booking.findById(bookingId)
      .populate("user car")
      .session(session);

    if (!bookingData) {
      throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
    }

    // Validate startTime and endTime
    const startTimeHours =
      parseFloat(bookingData.startTime.split(":")[0]) +
      parseFloat(bookingData.startTime.split(":")[1]) / 60;
    const endTimeHours =
      parseFloat(endTime.split(":")[0]) +
      parseFloat(endTime.split(":")[1]) / 60;

    if (startTimeHours > endTimeHours) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "End time must be greater than start time"
      );
    }

    // Update booking data
    bookingData.endTime = endTime;
    const duration = endTimeHours - startTimeHours;

    if (!bookingData.car || typeof bookingData.car === "string") {
      throw new AppError(httpStatus.BAD_REQUEST, "Car details not available");
    }

    const car = bookingData.car as any; // Casting to any for simplicity, should be properly typed
    bookingData.totalCost = duration * car.pricePerHour;

    // Update car status to available
    await Car.findByIdAndUpdate(bookingData.car._id, {
      status: "available",
    }).session(session);

    // Save updated booking data
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      bookingData,
      {
        new: true,
        runValidators: true,
        session: session,
      }
    ).populate("user car");

    await session.commitTransaction();
    session.endSession();

    return updatedBooking;
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(err.message);
  }
};
const bookingACarIntoDB = async (req: Request) => {
  const { carId, date, startTime } = req.body;
  const userId = req.user?._id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the car by ID within the transaction session
    const car = await Car.findById(carId).session(session);

    // Throw error if car is not found or is marked as deleted
    if (!car || car.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, "Car not found");
    }

    // Throw error if car is not available for booking
    if (car.status !== "available") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Car is not available for booking"
      );
    }

    // Create the booking data object
    const bookingData = {
      car: carId,
      date,
      startTime,
      user: userId,
    };

    // Save the booking to the database within the transaction session
    const booking = await Booking.create([bookingData], { session: session });

    // Ensure booking is a Mongoose Document by casting
    const populatedBooking = await Booking.findById(booking[0]._id)
      .populate("user")
      .populate("car")
      .session(session);

    if (!populatedBooking) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to retrieve populated booking"
      );
    }

    // Update the car status to "unavailable" within the transaction session
    car.status = "unavailable";
    await car.save({ session: session });

    // Commit the transaction if all operations succeed
    await session.commitTransaction();
    session.endSession();

    return populatedBooking;
  } catch (err: any) {
    // Rollback the transaction if any error occurs
    await session.abortTransaction();
    session.endSession();
    throw new Error(err.message);
  }
};

export const BookingServices = {
  getAllBookingsIntoDB,
  bookingACarIntoDB,
  getUserBookingsIntoDB,
  carReturnIntoDB,
};
