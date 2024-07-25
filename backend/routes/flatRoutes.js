const express = require("express");
const router = express.Router();
const FlatController = require("../controllers/FlatController");
const authenticateToken = require("../middleware/auth");

router.get("/search", authenticateToken, FlatController.getAll);

module.exports = router;
