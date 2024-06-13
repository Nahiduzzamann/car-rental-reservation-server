export interface IUser extends Document {
  _id?: string;
  name: string;
  email: string;
  role?: "user" | "admin";
  password: string;
  phone: string;
  address: string;
}
