import mongoose from "mongoose";

// const baseUrl = "localhost:27017" || "0.0.0.0:27017";
const url = process.env.MONGODB_URL;
export const connectToDb = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
