import express from "express";
import { CarControllers } from "./car.controller";
import { checkAdmin, verifyToken } from "../../middlewares/auth";
import { BookingsControllers } from "../booking/booking.controller";
const router = express.Router();
router.put(
  "/return",
  verifyToken,
  checkAdmin,
  BookingsControllers.returnCarController
);
router.post("",verifyToken, checkAdmin, CarControllers.createCarController);
router.get("", CarControllers.getAllCarsController);
router.get("/:id", CarControllers.getACarController);
router.put("/:id",verifyToken, checkAdmin, CarControllers.updateCarController);
router.delete("/:id",verifyToken, checkAdmin, CarControllers.deleteCarController);



export const CarRoutes = router;
