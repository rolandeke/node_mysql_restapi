const mysql = require("mysql");

const connPool = mysql.createPool({
  connectionLimit: 10,
  password: "Chinedumeke",
  user: "root",
  database: "ajaxphp",
  host: "localhost",
  port: "3306"
});

let commentsdb = {};

commentsdb.all = () => {
  return new Promise((resolve, reject) => {
    connPool.query("SELECT * FROM ajaxphp.comments", (err, results) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(results);
      }
    });
  });
};

commentsdb.one = id => {
  return new Promise((resolve, reject) => {
    connPool.query(
      "SELECT * FROM ajaxphp.comments WHERE id = ? ",
      [id],
      (err, results) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(results[0]);
        }
      }
    );
  });
};

//This function is for adding a comment to the database
commentsdb.add = ({ username, comment }) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO comments (username,comment) VALUES('${username}',' ${comment}')`;
    connPool.query(sql, (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

//This function is for deleting a comment from the database
commentsdb.delete = id => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM comments WHERE id = ?;";
    connPool.query(sql, [id], (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

//This function is for updating a comment in the database
commentsdb.update = ({ username, comment }, id) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE comments set username = ?, comment = ? where id = ?;";
    connPool.query(sql, [username, comment, id], (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};
module.exports = commentsdb;
