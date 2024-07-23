const Owner = require("../models/Owner");

exports.createOwner = async (req, res) => {
  try {
    const result = await Owner.create(req.body);
    res.status(201).json({ message: "Owner created", ownerId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOwners = async (req, res) => {
  try {
    const [rows] = await Owner.findAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOwnerById = async (req, res) => {
  try {
    const [rows] = await Owner.findById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
