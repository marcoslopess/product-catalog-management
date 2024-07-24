const db = require("../config/database");

const Category = {
  create: async (data) => {
    const { title, description, ownerId } = data;
    const connection = await db.getConnection();
    await connection.beginTransaction();
    try {
      const [result] = await connection.execute(
        "INSERT INTO categories (title, description, ownerId) VALUES (?, ?, ?)",
        [title, description, ownerId]
      );
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
  update: async (id, data) => {
    const { title, description, version } = data;
    const connection = await db.getConnection();
    await connection.beginTransaction();
    try {
      const [result] = await connection.execute(
        "UPDATE categories SET title = ?, description = ?, version = version + 1 WHERE id = ? AND version = ?",
        [title, description, id, version]
      );
      if (result.affectedRows === 0) {
        throw new Error("Conflict: Version mismatch");
      }
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
  findAll: async () => {
    const [rows] = await db.execute(`
      SELECT c.*, 
             CASE 
               WHEN EXISTS (SELECT 1 FROM products p WHERE p.categoryId = c.id) 
               THEN false 
               ELSE true 
             END AS canBeDeleted
      FROM categories c
    `);
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.execute("SELECT * FROM categories WHERE id = ?", [id]);
    return rows[0];
  },
  delete: async (id) => {
    const connection = await db.getConnection();
    await connection.beginTransaction();
    try {
      const [result] = await connection.execute("DELETE FROM categories WHERE id = ?", [id]);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
};

module.exports = Category;
