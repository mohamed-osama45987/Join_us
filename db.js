const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "join_us",
  password: "1234",
});

module.exports = pool.promise();
