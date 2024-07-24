const db = require("../config/database");

const Product = {
  create: async (data) => {
    const { title, description, price, categoryId, ownerId } = data;
    const connection = await db.getConnection();
    await connection.beginTransaction();
    try {
      const [result] = await connection.execute(
        "INSERT INTO products (title, description, price, categoryId, ownerId) VALUES (?, ?, ?, ?, ?)",
        [title, description, price, categoryId, ownerId]
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
    const { title, description, price, categoryId, version } = data;
    const connection = await db.getConnection();
    await connection.beginTransaction();
    try {
      const [result] = await connection.execute(
        "UPDATE products SET title = ?, description = ?, price = ?, categoryId = ?, version = version + 1 WHERE id = ? AND version = ?",
        [title, description, price, categoryId, id, version]
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
    const [rows] = await db.execute("SELECT * FROM products");
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
  },
  delete: async (id) => {
    const connection = await db.getConnection();
    await connection.beginTransaction();
    try {
      const [result] = await connection.execute("DELETE FROM products WHERE id = ?", [id]);
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

module.exports = Product;
