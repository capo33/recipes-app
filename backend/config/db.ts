import mongoose from "mongoose";

import env from "../utils/validateEnv";

export const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI as string);
    await mongoose.connect(env?.MONGO_URI);
    console.log("Connected to MongoDB ✅");
  } catch (error) {
    console.log("Failed to connect to the db ❌");
    console.log(error);
  }
};
