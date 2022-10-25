const connection = require("../utils/db");

let users = [{socketId:"123",user:"Carl"},{socketId:"1234",user:"Allen"}];
// let users = [];
const addUser = (user, socketId) => {
  !users.some((user) => user.user === user) && users.push({ user, socketId });
};
const insertMessage = async (sender, receiver, message) => {
  try {
    await connection.queryAsync(
      "INSERT IGNORE INTO `message`( `sender`, `receiver`, `message`) VALUES (?)",
      [[sender, receiver, message]]
    );
  } catch (err) {
    console.log(err);
  }
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
module.exports.socket = function (io) {
  io.on("connection", (socket) => {
    console.log("a user connected  " + socket.id);
    socket.on("addUser", (user) => {
      addUser(user, socket.id);
      io.emit("getUsers", users);
    });
    socket.on("sendMessage", (item) => {
      const { sender, receiver, message, socketId } = item;
      insertMessage(sender, receiver, message);
      io.to(socketId).emit("getMessage", item);
      // console.log("sendMessage", item);
    });
    socket.on("disconnect", (e) => {
      console.log("user disconnected ", socket.id);
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
}; 
module.exports.getMessages = async (req, res, next) => {
  // console.log("getMessages", req.body);
  const { sender, receiver } = req.body;
  try {
    let getMessages = await connection.queryAsync(
      "SELECT sender,receiver,message,time FROM message WHERE sender in (?,?) and receiver in (?,?)",
      [sender, receiver, sender, receiver]
    );
    // console.log("getMessages", getMessages);
    res.json({ status: "success", data: getMessages });
  } catch (err) {
    next(err);
  }
};
