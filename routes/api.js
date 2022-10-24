
const express = require("express");
const router = express.Router();
const {register,login,logout,sendMessage} =require('../controller/usersController')
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);


router.post("/sendMessage", sendMessage)

module.exports = router;