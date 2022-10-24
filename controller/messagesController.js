const connection = require("../utils/db");


let users = [{socketId:"123",user:"Carl"},{socketId:"1234",user:"Allen"}];
const addUser = (user, socketId) => {
  !users.some((user) => user.user === user) && users.push({ user, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
module.exports.socket = function(io) {
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
};

module.exports.sendMessage = async (req, res, next) => {
  console.log(req.body);
  const {sender,receiver,message}=req.body
  try {
    let insertResult = await connection.queryAsync(
      "INSERT IGNORE INTO `message`( `sender`, `receiver`, `message`) VALUES (?)",
      [[sender, receiver,message]]
    );
    res.json({"status":"success"})
  } catch (err) {
    next(err);
  }
};
module.exports.getMessages = async (req, res, next) => {
  console.log(req.body);
  const {sender,receiver}=req.body
  try {
    let getMessages = await connection.queryAsync(
      "SELECT sender,receiver,message,time FROM message WHERE sender = ? and receiver = ?",
      [sender, receiver]
    );
    // console.log("getMessages",getMessages)
    res.json({"status":"success",data:getMessages})
  } catch (err) {
    next(err);
  }
};
