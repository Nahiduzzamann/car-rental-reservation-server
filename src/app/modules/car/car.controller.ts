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

export const CarControllers = {
  createCarController,
};
