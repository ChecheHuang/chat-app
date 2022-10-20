const connection = require("../utils/db");

module.exports.register = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    let insertResult = await connection.queryAsync(
      "INSERT IGNORE INTO `users`( `userName`, `password`) VALUES (?)",
      [[userName, password]]
    );
    if (insertResult.affectedRows === 1){
        res.json({ status: "success" })
    }else{
        res.json({ status: "error",message:"名稱已經存在" });
    } ;
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  let queryResults = await connection.queryAsync("SELECT * FROM users;");
  res.json(queryResults);
};
