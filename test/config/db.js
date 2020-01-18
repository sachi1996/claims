var mysql = require('mysql');

var conn = mysql.createConnection({
    database: 'claim',
    host: "localhost",
    user: "root",
    password: ""
  });
  
  conn.connect((err) => {
      if (!err) {
        console.log("ready to coding...with EmployeeDB");
      } else{
        console.log("Failed connection to database");
      }
    });

module.exports = conn;