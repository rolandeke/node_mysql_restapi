const mysql = require('mysql')

const connPool  = mysql.createPool({
    connectionLimit: 10,
    user: "root",
    host: "localhost",
    password: "Chinedumeke",
    database:"ajaxphp",
    port: "3306"
})

let usersdb = {};

usersdb.all = () => {
     return new Promise((resolve, reject) => {
         connPool.query("SELECT * FROM users", (err, result) => {

            if(err){
                return reject(err);
            }else{
                return  resolve(result)
            }
         })
     })
}

usersdb.one = id => {

    return new Promise((resolve, reject) => {
        connPool.query("SELECT * FROM users WHERE id = ? ", [id], (err, result) =>{
            if(err){
                return reject(err);

            }else{
                return resolve(result)
            }
        })
    })
}

usersdb.onebyname = (name) => {
    return new Promise((resolve, reject) => {
        connPool.query("SELECT * FROM users WHERE firstname = ? or lastname= ? ",[name,name],(err, result) =>{
            if(err){
                return reject(err);
            }else{
                return resolve(result)
            }
        } )
    })
}



module.exports = usersdb;
