const { pool } = require("../config/database");
const publishMessage = require("../utils/publisher");

const Category = {
  create: async (data) => {
    const { title, description, ownerId } = data;
    const connection = await pool.getConnection();
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
  update: async (role, id, data) => {
    const { title, description, version } = data;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
      const [result] = await connection.execute(
        "UPDATE categories SET title = ?, description = ?, version = version + 1 WHERE id = ? AND version = ?",
        [title, description, id, version]
      );
      if (result.affectedRows === 0) {
        throw new Error("Conflict: Version mismatch");
      }

      if (role === "admin") {
        data.categoryId = id;
        await publishMessage({ type: "UPDATE_CATEGORY", payload: data });
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
    const [rows] = await pool.execute(`
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
    const [rows] = await pool.execute("SELECT * FROM categories WHERE id = ?", [id]);
    return rows[0];
  },
  delete: async (id) => {
    const connection = await pool.getConnection();
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
