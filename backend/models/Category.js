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
  update: (id, data) => {
    const { title, description } = data;
    return db.execute("UPDATE categories SET title = ?, description = ? WHERE id = ?", [title, description, id]);
  },
  findAll: () => {
    return db.execute("SELECT * FROM categories");
  },
  findById: (id) => {
    return db.execute("SELECT * FROM categories WHERE id = ?", [id]);
  },
};

module.exports = Category;
