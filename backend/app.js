const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authenticateToken = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/owners", authenticateToken, ownerRoutes);
app.use("/products", authenticateToken, productRoutes);
app.use("/categories", authenticateToken, categoryRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
