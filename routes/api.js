
const express = require("express");
const router = express.Router();
const {register,login,logout} =require('../controller/usersController')
const {getMessages,sendMessage} =require('../controller/messagesController')

router.post('/webhook',(req,res)=>{
    const exec = require('child_process').exec;
    console.log("打webhook")
    const script=exec("sh webhook.sh",(error,stdout,stderr)=>{
        console.log(stdout)
        console.log(stderr)
    })
    if(error!==null){
        console.log(error)
    }
    res.send("我是webhook!")
})
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);


// router.post("/sendMessage", sendMessage)
router.post("/getMessages", getMessages)

module.exports = router;