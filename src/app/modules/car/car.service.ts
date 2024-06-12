import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { ICar } from "./car.interface";
import Car from "./car.model";

const createCarIntoDB = async (payload: ICar) => {
  try {
    const savedCar = await Car.create(payload);

    if (!savedCar) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create car");
    }

    return savedCar;
  } catch (err: any) {
    throw new Error(err);
  }
};
const getAllCarsIntoDB = async () => {
  try {
    const cars = await Car.find({ isDeleted: false });

    if (!cars) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to fetch car");
    }

    return cars;
  } catch (err: any) {
    throw new Error(err);
  }
};




export const CarServices = {
  createCarIntoDB,
  getAllCarsIntoDB
};
