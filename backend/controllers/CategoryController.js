const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const result = await Category.create(req.body);
    res.status(201).json({ message: "Category created", categoryId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Category.update(req.user.role, id, req.body);
    res.status(200).json({ message: "Category updated", affectedRows: result.affectedRows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const rows = await Category.findAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const rows = await Category.findById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Category.delete(id);
    res.status(200).json({ message: "Category deleted", affectedRows: result.affectedRows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
