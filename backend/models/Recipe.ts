import { Schema, model } from "mongoose";

import ReviewModel from "./Review";
import { IRecipe } from "../interfaces/recipeInterface";

const recipeSchema = new Schema<IRecipe>(
  {
    name: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: [true, "Please enter your instructions"],
    },
    ingredients: {
      type: [String],
      required: [true, "Please enter your ingredients"],
    },
    image: {
      type: String,
    },
    cookingTime: {
      type: Number,
      required: [true, "Please enter your cooking time"],
      default: 0,
    },
    views: {
      type: Number,
      required: [true, "Please enter your views"],
      default: 0,
    },
    reviews: [ReviewModel.schema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },

    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },

    slug: {
      type: String,
      lowercase: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default model<IRecipe>("Recipe", recipeSchema);
