const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const socket = require("socket.io");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/images", express.static(__dirname + "/images"));

app.use("/invites", require("./routes/invites.route"));
app.use("/user", require("./routes/users.route"));
app.use("/dep", require("./routes/departments.route"));
app.use("/record", require("./routes/patientRecords.route"));
app.use(require("./routes/messages.route"));

// async function server(port) {
//   try {
//     await mongoose.connect(process.env.DB_URL.toString());
//     console.log("Подключение к базе данных прошла успешна");
//   } catch (error) {
//     console.log("Ошибка при соединении с сервером ");
//   }
// }

mongoose.connect(process.env.DB_URL.toString()).then(() => {
  console.log("mongoDB connected")
}).catch(() => console.log("error"))
2
const server = app.listen(3001, () => {
  console.log("сервер запущен");
});
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatsocket = socket;
  socket.on("addUser", (id) => {
    onlineUsers.set(id, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});

// server(Number(process.env.SERVER_PORT));
