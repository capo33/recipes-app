import { Schema, model } from "mongoose";

import { ICategory } from "../interfaces/categoryInterface";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ICategory>("Category", categorySchema);
