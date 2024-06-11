import httpStatus from "http-status";
import { Student } from "./user.model";
import AppError from "../../errors/AppError";

const createStudentIntoDB = async ( payload: {name:string}) => {

  try{
      const newStudent = await Student.create(payload);
  
      if (!newStudent) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
      }
  
      return newStudent;
    } catch (err: any) {
      throw new Error(err);
    }
}

export const UserServices = {
  createStudentIntoDB
};
