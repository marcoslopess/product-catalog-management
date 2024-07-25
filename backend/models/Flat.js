const { pool } = require("../config/database");

const Flat = {
  findAll: async () => {
    const [rows] = await pool.execute(
      "SELECT categoryId, categoryName, ownerId, productDescription, productId as id, productName, productPrice FROM flat_catalog"
    );
    return rows;
  },
};

module.exports = Flat;
