import { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  answer: string;
  avatar: string;
  about: string;
  savedRecipes: Types.ObjectId[];
  phone: string;
  isAdmin: boolean;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
