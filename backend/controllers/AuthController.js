const Owner = require("../models/Owner");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const result = await Owner.create(req.body);
    const token = jwt.sign({ id: result[0].insertId }, "secret_key", { expiresIn: "1h" });
    res.status(201).json({ message: "Owner registered", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await Owner.findByEmail(email);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Owner not found" });
    }

    const owner = rows[0];
    const isPasswordValid = await bcrypt.compare(password, owner.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: owner.id }, "secret_key", { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
