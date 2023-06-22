import { Document, Types } from "mongoose";
import { IReview } from "./reviewInterface";

export interface IRecipe extends Document {
  name: string;
  instructions: string;
  ingredients: string[];
  image: string;
  cookingTime: number;
  views: number;
  reviews: IReview[];
  rating: number;
  numReviews: number;
  slug: string;
  likes: Types.ObjectId[];
  category: Types.ObjectId;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
