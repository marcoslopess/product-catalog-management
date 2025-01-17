const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const result = await Product.create(req.user.role, req.body);
    res.status(201).json({ message: "Product created", productId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.update(req.user.role, id, req.body);
    res.status(200).json({ message: "Product updated", affectedRows: result.affectedRows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const rows = await Product.findAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const rows = await Product.findById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.delete(req.user.role, id);
    res.status(200).json({ message: "Product deleted", affectedRows: result.affectedRows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
