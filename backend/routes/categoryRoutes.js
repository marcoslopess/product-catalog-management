const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const authenticateToken = require("../middleware/auth");

router.post("/", authenticateToken, CategoryController.createCategory);
router.get("/", authenticateToken, CategoryController.getAllCategories);
router.get("/:id", authenticateToken, CategoryController.getCategoryById);

module.exports = router;
