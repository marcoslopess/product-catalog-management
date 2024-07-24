const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const result = await Product.create(req.body);
    res.status(201).json({ message: "Product created", productId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.update(id, req.body);
    res.status(200).json({ message: "Product updated", affectedRows: result[0].affectedRows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProductCategory = async (req, res) => {
  const { productId, categoryId } = req.params;
  try {
    const result = await Product.updateCategory(productId, categoryId);
    res.status(200).json({ message: "Product category updated", affectedRows: result[0].affectedRows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await Product.findAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const [rows] = await Product.findById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.delete(id);
    res.status(200).json({ message: "Product deleted", affectedRows: result[0].affectedRows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
