import express from "express";
import { CarControllers } from "./car.controller";
import { checkAdmin, verifyToken } from "../../middlewares/auth";
const router = express.Router();

router.post("",verifyToken, checkAdmin, CarControllers.createCarController);
router.get("", CarControllers.getAllCarsController);
router.get("/:id", CarControllers.getACarController);
export const CarRoutes = router;
