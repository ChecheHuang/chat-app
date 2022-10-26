

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
    origin:"http://localhost:3000",
  },
});
const socket = require("./controller/messagesController");
socket.socket(io);

app.post("/webhook", function (req, res) {
  const exec = require("child_process").exec;
  var yourscript = exec("sh webhook.sh", (error, stdout, stderr) => {
    console.log(`${stdout}`);
    console.log(`${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
  console.log("被打ㄌ");
  res.send("webhook");
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
 

const port = 8080

http.listen(port, async function () {
  await connection.connectAsync();
  console.log("listening on port " + port);
});
