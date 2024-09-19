import mongoose from "mongoose";

const baseUrl = process.env.MONGODB_URL;

export const connectToDb = async () => {
  try {
    await mongoose.connect(baseUrl);
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
