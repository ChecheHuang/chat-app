
const express = require("express");
const router = express.Router();
const {register,login,logout} =require('../controller/usersController')
const {getMessages} =require('../controller/messagesController')


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);


router.post("/getMessages", getMessages)

module.exports = router;