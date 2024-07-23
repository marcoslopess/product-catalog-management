const db = require("../config/database");
const bcrypt = require("bcryptjs");

const Owner = {
  create: async (data) => {
    const { name, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    return db.execute("INSERT INTO owners (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
  },
  findByEmail: (email) => {
    return db.execute("SELECT * FROM owners WHERE email = ?", [email]);
  },
};

module.exports = Owner;
