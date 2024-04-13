import mongoose from "mongoose";

// const baseUrl = "localhost:27017" || "0.0.0.0:27017";
console.log("H");
console.log(process.env.MONGODB_URL);
console.log("Y");
export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
