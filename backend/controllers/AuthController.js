const Owner = require("../models/Owner");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const count = await Owner.getOwnersCount();
    const role = count === 0 ? "admin" : "user";
    req.body.role = role;
    const result = await Owner.create(req.body);
    const token = jwt.sign({ id: result.insertId, name: req.body.name, role }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
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

    const token = jwt.sign({ id: owner.id, name: owner.name, role: owner.role }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
