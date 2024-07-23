const db = require("../config/database");

const Product = {
  create: (data) => {
    const { title, description, price, category, ownerId } = data;
    return db.execute("INSERT INTO products (title, description, price, category, ownerId) VALUES (?, ?, ?, ?, ?)", [
      title,
      description,
      price,
      category,
      ownerId,
    ]);
  },
  findAll: () => {
    return db.execute("SELECT * FROM products");
  },
};

module.exports = Product;
