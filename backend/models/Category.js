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
    return db.execute(`
      SELECT c.*, 
             CASE 
               WHEN EXISTS (SELECT 1 FROM products p WHERE p.categoryId = c.id) 
               THEN false 
               ELSE true 
             END AS canBeDeleted
      FROM categories c
    `);
  },
  findById: (id) => {
    return db.execute("SELECT * FROM categories WHERE id = ?", [id]);
  },
  delete: (id) => {
    return db.execute("DELETE FROM categories WHERE id = ?", [id]);
  },
};

module.exports = Category;
