import AppError from "../../errors/AppError";
import { generateToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/password";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
interface LoginInput {
  email: string;
  password: string;
}
const signUpUser = async (payload: IUser) => {
  const { name, email,role, password, phone, address } = payload;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(400, "Email already in use");
  }

  const hashedPassword = await hashPassword(password);

  try {
    const user = new User({
      name,
      email,
      role,
      password: hashedPassword,
      phone,
      address,

    });
    const res = await User.create(user);

    return res;
  } catch (err: any) {
    throw new Error(err);
  }
};

const loginUser = async ({ email, password }: LoginInput) => {
  try {
    const user = await User.findOne({ email });

    if (!user || !(await comparePassword(password, user.password))) {
      throw new AppError(400, "Invalid login credentials");
    }

    const token = generateToken(user.email, user.role as string);

    return { user, token }
  } catch (err: any) {
    throw new Error(err);
  }
};
export const AuthServices = {
  signUpUser,
  loginUser,
};
