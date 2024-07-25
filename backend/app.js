const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const flatRoutes = require("./routes/flatRoutes");
const authenticateToken = require("./middleware/auth");
const consumeMessages = require("./utils/consumer");
const { pool } = require("./config/database");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/owners", authenticateToken, ownerRoutes);
app.use("/products", authenticateToken, productRoutes);
app.use("/categories", authenticateToken, categoryRoutes);
app.use("/flat", authenticateToken, flatRoutes);

async function populateFlatTable() {
  try {
    await pool.execute(`
        INSERT INTO flat_catalog (productId, productName, productDescription, productPrice, categoryId, categoryName, ownerId)
        SELECT p.id, p.title, p.description, p.price, 
               COALESCE(c.id, 0) AS categoryId, 
               COALESCE(c.title, 'No Category') AS categoryName, 
               p.ownerId
        FROM products p
        LEFT JOIN categories c ON p.categoryId = c.id
        ON DUPLICATE KEY UPDATE
            productName = VALUES(productName),
            productDescription = VALUES(productDescription),
            productPrice = VALUES(productPrice),
            categoryId = VALUES(categoryId),
            categoryName = VALUES(categoryName),
            ownerId = VALUES(ownerId);
      `);
    console.log("Flat table populated");
  } catch (error) {
    console.error("Failed to populate flat table", error);
  }
}

populateFlatTable();

consumeMessages();

module.exports = app;
