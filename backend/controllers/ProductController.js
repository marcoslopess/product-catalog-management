const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    console.log(req.body);
    res.status(201).json({});
    // const result = await Product.create(req.body);
    // res.status(201).json({ message: "Product created", productId: result[0].insertId });
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
