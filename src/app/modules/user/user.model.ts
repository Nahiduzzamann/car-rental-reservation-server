import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.interface';



const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
}, { timestamps: true });

const User = model<IUser>('User', userSchema);

export default User;
