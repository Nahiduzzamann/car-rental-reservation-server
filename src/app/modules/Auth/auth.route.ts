import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "../user/user.zod";
const router = express.Router();

router.post("/signup",validateRequest(UserValidations.userZodSchema), AuthControllers.signUpUser);
router.post("/signin", AuthControllers.loginUser);
export const AuthRoutes = router;
