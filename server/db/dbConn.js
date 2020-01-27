const mysql = require("mysql");

const connPool = mysql.createPool({
  connectionLimit: 10,
  user: "root",
  host: "localhost",
  password: "Chinedumeke",
  database: "ajaxphp",
  port: "3306"
});

connPool.getConnection(err => {
  if (err) throw err;

  console.log(`Connected Successfully`);
});
module.exports = connPool;
