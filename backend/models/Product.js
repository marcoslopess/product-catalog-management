const db = require("../config/database");

const Product = {
  create: (data) => {
    const { title, description, price, categoryId, ownerId } = data;
    return db.execute("INSERT INTO products (title, description, price, categoryId, ownerId) VALUES (?, ?, ?, ?, ?)", [
      title,
      description,
      price,
      categoryId,
      ownerId,
    ]);
  },
  update: (id, data) => {
    const { title, description, price, categoryId } = data;
    return db.execute("UPDATE products SET title = ?, description = ?, price = ?, categoryId = ? WHERE id = ?", [
      title,
      description,
      price,
      categoryId,
      id,
    ]);
  },
  updateCategory: (productId, categoryId) => {
    return db.execute("UPDATE products SET categoryId = ? WHERE id = ?", [categoryId, productId]);
  },
  findAll: () => {
    return db.execute("SELECT * FROM products");
  },
  findById: (id) => {
    return db.execute("SELECT * FROM products WHERE id = ?", [id]);
  },
};

module.exports = Product;
