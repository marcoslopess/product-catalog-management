const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const authenticateToken = require("../middleware/auth");

router.post("/", authenticateToken, ProductController.createProduct);
router.put("/:id", authenticateToken, ProductController.updateProduct);
router.put("/:productId/category/:categoryId", authenticateToken, ProductController.updateProductCategory);
router.get("/", authenticateToken, ProductController.getAllProducts);
router.get("/:id", authenticateToken, ProductController.getProductById);
router.delete("/:id", authenticateToken, ProductController.deleteProduct);

module.exports = router;
