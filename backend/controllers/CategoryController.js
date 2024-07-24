const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const result = await Category.create(req.body);
    res.status(201).json({ message: "Category created", categoryId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Category.update(id, req.body);
    res.status(200).json({ message: "Category updated", affectedRows: result[0].affectedRows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const [rows] = await Category.findAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const [rows] = await Category.findById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
