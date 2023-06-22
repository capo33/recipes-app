import { Schema, model } from "mongoose";

import { IReview } from "../interfaces/reviewInterface";

const reviewSchema = new Schema<IReview>(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Please enter your rating"],
      default: 0,
    },
    comment: {
      type: String,
      required: [true, "Please enter your comment"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default model<IReview>("Review", reviewSchema);
