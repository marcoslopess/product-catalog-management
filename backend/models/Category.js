const db = require("../config/database");

const Category = {
  create: (data) => {
    const { title, description, ownerId } = data;
    return db.execute("INSERT INTO categories (title, description, ownerId) VALUES (?, ?, ?)", [
      title,
      description,
      ownerId,
    ]);
  },
  findAll: () => {
    return db.execute("SELECT * FROM categories");
  },
  findById: (id) => {
    return db.execute("SELECT * FROM categories WHERE id = ?", [id]);
  },
};

module.exports = Category;
