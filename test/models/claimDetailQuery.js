const conn = require('../config/db');

module.exports.employees = (claimId, claimName, claimDate, claimAmount, callback) =>{
    const qry = "insert into  (id, claimName, claimDate, claimAmount) values(?, ?, ?, ?)";
    conn.query(qry,[claimId, claimName, claimDate, claimAmount], (err,result) =>{
      if (err){
        return callback(err,null);
      }
      if(result){
        return callback(null,result[0]);
      }
    });
  }

  module.exports.userCredentials = (id, userName, userEmail, callback) => {
      const qry = "insert into user (userId, userName, userEmail) values (?, ?, ?)";
      conn.query(qry, [id, userName, userEmail], (err, result) =>{
          if(err){
              return callback(err, null);
          }
          if(result){
              return callback(null, result[0]);
          }
      })
  }

  module.exports.myClaims = (callback) => {
    const qry = "select * from user";
      conn.query(qry, (err, result) =>{
          if(err){
              return callback(err, null);
          }
          else{
              return callback(null, result);
          }
      })
  }

  module.exports.getFiles = (callback) => {
    const qry = "select * from persons"
      conn.query(qry, (err, result) => {
        if(err){
          return callback(err, null);
        } else {
          return callback(null, result);
        }
      })
  }

  module.exports.fileUploads = (fileName, callback) => {
    const qry = "insert into persons (FileName) values (?)";
    conn.query(qry, [fileName], (err, result) => {
      if(err){
        return callback(err, null);
      } else {
        return callback(null, result[0]);
      }
    })
  }
  
