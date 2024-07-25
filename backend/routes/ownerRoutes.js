const express = require("express");
const router = express.Router();
const OwnerController = require("../controllers/OwnerController");
const authenticateToken = require("../middleware/auth");
const authorizeAdmin = require("../middleware/authorizeAdmin");

router.get("/", authenticateToken, authorizeAdmin, OwnerController.listOwners);
router.get("/:id", authenticateToken, authorizeAdmin, OwnerController.getOwnerById);
router.put("/:id/role", authenticateToken, authorizeAdmin, OwnerController.updateRole);

module.exports = router;
