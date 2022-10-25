const connection = require("../utils/db");

module.exports.register = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    let insertResult = await connection.queryAsync(
      "INSERT IGNORE INTO `users`( `userName`, `password`) VALUES (?)",
      [[userName, password]]
    );
    if (insertResult.affectedRows === 1) {
      res.json({ status: "success", data: { userName, password } });
    } else {
      res.json({ status: "error", message: "名稱已經存在" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  // console.log('login',req.body);
  const { userName, password } = req.body;
  try {
    const result = await connection.queryAsync(
      "SELECT userName,password  from users where userName=?",
      [[userName]]
    );
    const realPassword = result[0]?.password;
    if (!realPassword) {
      res.json({ status: "error", message: "此名稱尚未註冊" });
      return;
    }
    if (password !== realPassword) {
      res.json({ status: "error", message: "密碼錯誤" });
      return;
    }
    res.json({ status: "success" });
    console.log("realPassword",realPassword);
  } catch (err) {
    next(err);
  }
};

module.exports.logout = async (req, res, next) => {
  console.log(req.body);
  try {
  } catch (err) {
    next(err);
  }
};

