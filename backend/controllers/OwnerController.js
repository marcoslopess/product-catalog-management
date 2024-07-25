const Owner = require("../models/Owner");

exports.listOwners = async (req, res) => {
  try {
    const owners = await Owner.getOwners();
    res.json(owners);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getOwnerById = async (req, res) => {
  try {
    const rows = await Owner.findById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    await Owner.updateOwnerRole(id, role);
    res.send("Role updated successfully");
  } catch (err) {
    res.status(500).send(err);
  }
};
