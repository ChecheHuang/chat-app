const connection = require("../utils/db");

// let users = [{user:"Carl",socketId:""},{user:"31",socketId:""}];
let users = [];
const addUser = async(user, socketId) => {
  const index = users.findIndex((item)=>item.user===user)
  if(index!==-1){
    users[index].socketId=socketId
    return
  }else{
   await selectAllUsers()
   addUser(user,socketId)
  }
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
const selectAllUsers = async () => {
  try {
    const result = await connection.queryAsync(
      "SELECT userName FROM `users`"
    );
    for(let i of result){
      const isset = users.some((user)=>user.user===i.userName)
      !isset&&users.push({user:i.userName,socketId:""})
    }
  } catch (err) {
    console.log(err);
  }
};
const removeUser = (socketId) => {
  const index = users.findIndex((item)=>item.socketId===socketId)
  if(index!==-1){
    users[index].socketId=""
    return
  }
};
module.exports.socket = function (io) {
  io.on("connection", (socket) => {
    console.log("a user connected  " + socket.id);
    selectAllUsers()
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
