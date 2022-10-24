
const express = require("express");
const router = express.Router();
const {register,login,logout} =require('../controller/usersController')
const {getMessages,sendMessage} =require('../controller/usersController')
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);


router.post("/sendMessage", sendMessage)
router.post("/getMessages", getMessages)

module.exports = router;