import mongoose from "mongoose";

const baseUrl = "localhost:27017" || "0.0.0.0:27017";

export const connectToDb = async () => {
  try {
    await mongoose.connect(`mongodb://${baseUrl}/ChatterUp`);
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
