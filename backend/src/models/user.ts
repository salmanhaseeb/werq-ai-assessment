import { Schema, model } from 'mongoose';
import { IUser } from '../types/user';

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: [true, "can't be blank"], unique: true },
    firstName: { type: String, required: [true, "can't be blank"] },
    lastName: { type: String, required: [true, "can't be blank"] },
    password: { type: String, required: [true, "can't be blank"] },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
