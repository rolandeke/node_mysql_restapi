const connPool = require("./dbConn");

let usersdb = {};

//This function is for getting all users from the database
usersdb.all = () => {
  return new Promise((resolve, reject) => {
    connPool.query("SELECT * FROM users", (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

//FUnction for getting a single user by ID from the database
usersdb.one = id => {
  return new Promise((resolve, reject) => {
    connPool.query("SELECT * FROM users WHERE id = ? ", [id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

//Function for getting user by name from the database
usersdb.onebyname = name => {
  return new Promise((resolve, reject) => {
    connPool.query(
      "SELECT * FROM users WHERE firstname = ? or lastname= ? ",
      [name, name],
      (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      }
    );
  });
};

//FUnction for adding a user to the database
usersdb.add = ({ firstname, lastname, age }) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO users (firstname, lastname, age) VALUES ('${firstname}', '${lastname}', '${age}');`;

    connPool.query(sql, (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

//Function for deleteing a user from the database

usersdb.delete = id => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM ajaxphp.users WHERE id = ${id}`;
    connPool.query(sql, (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};
module.exports = usersdb;
