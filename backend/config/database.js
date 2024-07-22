const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "user",
  password: "12345",
  database: "product-catalog-management",
  port: 3306,
});

module.exports = pool.promise();
