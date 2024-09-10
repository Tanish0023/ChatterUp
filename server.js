// Importing external modeules
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

// Importing middlewares and requirements
import { connectToDb } from "./src/config/mongoose.db.js";
import { chatModel } from "./src/features/chat/chat.schema.js";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors);

// socket server
const server = http.createServer(app);

app.get("/", function (req, res) {
  console.log(path.join("/index.html"));
  res.sendFile(path.join("/index.html"));
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Connection made");

  socket.on("newUser", async (userName) => {
    socket.userName = userName.userName;
    socket.authorPic = userName.authorPic;
    //
    await chatModel
      .find()
      .sort({ timestamp: 1 })
      .limit(200)
      .then((messages) => {
        socket.emit("load_messages", messages);
      })
      .catch((err) => {
        console.log(err);
      });

    //
    socket.emit("userTopNameDisplay", userName.userName);
    io.emit("newUserJoins", userName.userName);
  });

  socket.on("sendMessage", async (message) => {
    let userMessage = {
      userName: socket.userName,
      message: message,
      authorPic: socket.authorPic,
    };

    const timeString = new Date().toLocaleTimeString();
    const [time, period] = timeString.split(" ");
    const [hour, minute] = time.split(":");

    const newChat = new chatModel({
      userName: socket.userName,
      message: message,
      timeStamp: new Date(),
      hourSecTime: `${hour}:${minute} ${period}`,
      authorPic: socket.authorPic,
    });
    await newChat.save();

    socket.broadcast.emit("chatMessage", userMessage);
  });

  socket.on("disconnect", () => {
    console.log("connection disconnected");
  });
});

// Handling wrong path error
app.use((req, res) => {
  res.status(404).send("Please provide a correct path");
});

//

//

const port = process.env.PORT;

server.listen(port, async () => {
  await connectToDb();
  console.log("Server is listening at ", port);
});
