const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const authenticateToken = require("../middleware/auth");

router.post("/", authenticateToken, CategoryController.createCategory);
router.put("/:id", authenticateToken, CategoryController.updateCategory);
router.get("/", authenticateToken, CategoryController.getAllCategories);
router.get("/:id", authenticateToken, CategoryController.getCategoryById);
router.delete("/:id", authenticateToken, CategoryController.deleteCategory);

module.exports = router;
