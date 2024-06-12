import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { ICar } from "./car.interface";
import Car from "./car.model";
import { Request } from "express";

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
const getACarIntoDB = async (id: string) => {
  try {
    const car = await Car.findById(id);
    if (!car || car.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, "Car not found");
    }

    return car;
  } catch (err: any) {
    throw new Error(err);
  }
};
const updateCarIntoDB = async (req: Request) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!car || car.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, "Car not found");
    }

    return car;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const CarServices = {
  createCarIntoDB,
  getAllCarsIntoDB,
  getACarIntoDB,
  updateCarIntoDB,
};
