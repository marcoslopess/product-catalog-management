const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "12345",
  database: process.env.DB_NAME || "product-catalog-management",
  port: process.env.DB_PORT || 3306,
};

const pool = mysql.createPool(dbConfig);

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "12345",
    port: process.env.DB_PORT || 3306,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
  await connection.query(`USE \`${process.env.DB_NAME}\``);
  await connection.query(`CREATE TABLE IF NOT EXISTS flat_catalog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId INT,
    productName VARCHAR(255),
    productDescription TEXT,
    productPrice DECIMAL(10, 2),
    categoryId INT,
    categoryName VARCHAR(255),
    ownerId INT
  )`);
  await connection.end();
}

module.exports = { pool, initializeDatabase };
