const { pool } = require("../config/database");
const bcrypt = require("bcryptjs");

const Owner = {
  create: async (data) => {
    const { name, email, password } = data;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
      const [users] = await pool.execute("SELECT COUNT(*) AS count FROM owners");
      const role = users[0].count === 0 ? "admin" : "user";

      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await pool.execute("INSERT INTO owners (name, email, password, role) VALUES (?, ?, ?, ?)", [
        name,
        email,
        hashedPassword,
        role,
      ]);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
  findByEmail: async (email) => {
    return await pool.execute("SELECT * FROM owners WHERE email = ?", [email]);
  },
  getOwners: async () => {
    const [owners] = await pool.execute("SELECT id, name, role FROM owners");
    return owners;
  },
  findById: async (id) => {
    const [rows] = await pool.execute("SELECT id, name, role FROM owners WHERE id = ?", [id]);
    return rows[0];
  },
  updateOwnerRole: async (id, role) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
      const [result] = await connection.execute("UPDATE owners SET role = ? WHERE id = ?", [role, id]);
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
  getOwnersCount: async () => {
    const [count] = await pool.execute("SELECT COUNT(*) AS count FROM owners");
    return count[0].count;
  },
};

module.exports = Owner;
