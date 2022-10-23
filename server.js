const connection = require("./utils/db");
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
const addUser = (user, socketId) => {
  !users.some((user) => user.user === user) && users.push({ user, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
io.on("connection", (socket) => {
  console.log("a user connected  " + socket.id);
  socket.on("addUser", (user) => {
    addUser(user, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("disconnect", (e) => {
    console.log("user disconnected ", socket.id);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});





let apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(function (err, req, res, next) {
  console.log("ERROR:", err);
  res.status(500);
  res.send("500 - Internal Sever Error 請洽系統管理員");
});

const port = process.env.PORT || 5000;

http.listen(port, async function () {
  await connection.connectAsync();
  console.log("listening on port " + port);
});
