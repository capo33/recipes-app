import { Schema, model } from "mongoose";

import { IUser } from "../interfaces/userInterface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: [true, "Please enter your answer"],
    },
    avatar: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg",
    },
    about: {
      type: String,
      default: "example: I am a photographer",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    savedRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
    phone: {
      type: String,
      default: "XXX-XXX-XXXX",
    },
    address: {
      type: String,
      default: "1234 Main St",
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
