import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CarServices } from "./car.service";

const createCarController = catchAsync(async (req, res) => {
  const result = await CarServices.createCarIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Car created successfully",
    data: result,
  });
});

const getAllCarsController = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarsIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars retrieved successfully",
    data: result,
  });
});
const getACarController = catchAsync(async (req, res) => {
  const result = await CarServices.getACarIntoDB(req.params.id );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "A Car retrieved successfully",
    data: result,
  });
});
const updateCarController = catchAsync(async (req, res) => {
  const result = await CarServices.updateCarIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car updated successfully",
    data: result,
  });
});
const deleteCarController = catchAsync(async (req, res) => {
  const result = await CarServices.deleteCarIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car Deleted successfully",
    data: result,
  });
});




export const CarControllers = {
  createCarController,
  getAllCarsController,
  getACarController,
  updateCarController,
  deleteCarController
};
