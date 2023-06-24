import { Schema, model } from "mongoose";

import { ICategory } from "../interfaces/categoryInterface";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
     },
    slug: {
      type: String,
     },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ICategory>("Category", categorySchema);
