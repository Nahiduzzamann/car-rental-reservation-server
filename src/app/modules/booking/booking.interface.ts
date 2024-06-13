import { Types } from "mongoose";
import { IUser } from "../user/user.interface";

export interface IBooking extends Document {
  date: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime: string | null;
  totalCost: number;
}
