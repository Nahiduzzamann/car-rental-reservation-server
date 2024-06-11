import { Request, Response } from "express";
import httpStatus from "http-status";

const createStudent = async (req:Request, res:Response) => {
    res.send('ok')
};

export const UserControllers = {
  createStudent,
};
