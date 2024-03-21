import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userName: String,
  message: String,
  timeStamp: Date,
  hourSecTime: String,
  authorPic: String,
});

export const chatModel = mongoose.model("chats", chatSchema);
