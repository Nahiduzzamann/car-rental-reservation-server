import express from 'express';
import { UserControllers } from './user.controler';

const router = express.Router();

router.post(
  '',
  UserControllers.createStudent,
);


export const UserRoutes = router;
