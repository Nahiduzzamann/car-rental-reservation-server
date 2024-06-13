import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const getAllBookingsController = catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookingsIntoDB(req);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  });
const getUserBookingsController = catchAsync(async (req, res) => {
    const result = await BookingServices.getUserBookingsIntoDB(req);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My Bookings retrieved successfully",
      data: result,
    });
  });
const bookingACarController = catchAsync(async (req, res) => {
    const result = await BookingServices.bookingACarIntoDB(req);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Car booked successfully",
      data: result,
    });
  });

  
export const BookingsControllers = {
    getAllBookingsController,
    bookingACarController,
    getUserBookingsController
  };
  