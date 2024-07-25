const { pool } = require("../config/database");
const publishMessage = require("../utils/publisher");

const Product = {
  create: async (role, data) => {
    console.log(data);
    const { title, description, price, categoryId, ownerId } = data;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
      const [result] = await connection.execute(
        "INSERT INTO products (title, description, price, categoryId, ownerId) VALUES (?, ?, ?, ?, ?)",
        [title, description, price, categoryId, ownerId]
      );
      if (role === "admin") {
        data.productId = result.insertId;
        data.version = 0;

        await publishMessage({ type: "CREATE_PRODUCT", payload: data });
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
  update: async (role, id, data) => {
    const { title, description, price, categoryId, version } = data;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
      const [result] = await connection.execute(
        "UPDATE products SET title = ?, description = ?, price = ?, categoryId = ?, version = version + 1 WHERE id = ? AND version = ?",
        [title, description, price, categoryId, id, version]
      );
      if (result.affectedRows === 0) {
        throw new Error("Conflict: Version mismatch");
      }
      if (role === "admin") {
        data.productId = id;
        data.version = version + 1;
        await publishMessage({ type: "UPDATE_PRODUCT", payload: data });
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
    const [rows] = await pool.execute("SELECT * FROM products");
    return rows;
  },
  findById: async (id) => {
    const [rows] = await pool.execute("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
  },
  delete: async (role, id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
      const [result] = await connection.execute("DELETE FROM products WHERE id = ?", [id]);
      if (role === "admin") {
        await publishMessage({ type: "DELETE_PRODUCT", payload: { productId: id } });
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
};

module.exports = Product;
