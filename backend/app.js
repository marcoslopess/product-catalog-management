const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const authRoutes = require("./routes/authRoutes");
const authenticateToken = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/owners", authenticateToken, ownerRoutes);
app.use("/products", authenticateToken, productRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
