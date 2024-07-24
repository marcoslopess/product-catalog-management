const db = require("../config/database");
const bcrypt = require("bcryptjs");

const Owner = {
  create: async (data) => {
    const { name, email, password } = data;
    const connection = await db.getConnection();
    await connection.beginTransaction();
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await db.execute("INSERT INTO owners (name, email, password) VALUES (?, ?, ?)", [
        name,
        email,
        hashedPassword,
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
  findByEmail: (email) => {
    return db.execute("SELECT * FROM owners WHERE email = ?", [email]);
  },
};

module.exports = Owner;
