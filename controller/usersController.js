const connection = require("../utils/db");

module.exports.register = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    let insertResult = await connection.queryAsync(
      "INSERT IGNORE INTO `users`( `userName`, `password`) VALUES (?)",
      [[userName, password]]
    );
    if (insertResult.affectedRows === 1){
        res.json({ status: "success",data:{userName,password} })
    }else{
        res.json({ status: "error",message:"名稱已經存在" });
    } ;
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  console.log(req.body)
  try {
    let updateResult = await connection.queryAsync(
      "UPDATE  users SET isOnline = 1 WHERE userName = ?",
      [[req.body.userName]]
    );
    if(updateResult.affectedRows===1){
      console.log("登入成功")
  res.json({status:"success"})

    }else{
      console.log("登入失敗")
  res.json({status:"error"})

    }
  } catch (err) {
    next(err);
  }
 
};

module.exports.logout = async (req, res, next) => {
  
 
};

