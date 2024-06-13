import express from "express";
import { CarControllers } from "./car.controller";
import { checkAdmin, verifyToken } from "../../middlewares/auth";
import { BookingsControllers } from "../booking/booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CarValidations } from "./car.zod";
const router = express.Router();
router.put(
  "/return",
  verifyToken,
  checkAdmin,
  validateRequest(CarValidations.CarReturnZodSchema),
  BookingsControllers.returnCarController
);
router.post("",verifyToken, checkAdmin,validateRequest(CarValidations.carCreateZodSchema), CarControllers.createCarController);
router.get("", CarControllers.getAllCarsController);
router.get("/:id", CarControllers.getACarController);
router.put("/:id",verifyToken, checkAdmin,validateRequest(CarValidations.updateCarZodSchema), CarControllers.updateCarController);
router.delete("/:id",verifyToken, checkAdmin, CarControllers.deleteCarController);



export const CarRoutes = router;
