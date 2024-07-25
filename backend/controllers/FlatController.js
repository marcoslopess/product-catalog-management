const Flat = require("../models/Flat");

exports.getAll = async (req, res) => {
  try {
    const rows = await Flat.findAll();
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
