const request = require("supertest");
const app = require("../app");
const { pool } = require("../config/database");
let server;
let token;
let productId;

describe("Product API", () => {
  beforeAll(async () => {
    await pool.execute(
      "CREATE TABLE IF NOT EXISTS owners (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))"
    );
    await pool.execute(
      "CREATE TABLE IF NOT EXISTS products (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, price DECIMAL(10, 2), categoryId INT, ownerId INT, version INT DEFAULT 0)"
    );

    server = app.listen(4001, () => {});

    await request(server)
      .post("/auth/register")
      .send({ name: "Test Owner", email: "owner@example.com", password: "password" });

    const response = await request(server)
      .post("/auth/login")
      .send({ email: "owner@example.com", password: "password" });

    token = response.body.token;
  });

  afterAll(async () => {
    await pool.execute("DROP TABLE IF EXISTS products");
    await pool.execute("DROP TABLE IF EXISTS categories");
    await pool.execute("DROP TABLE IF EXISTS owners");

    server.close();
  });

  it("should create a new product", async () => {
    const response = await request(server)
      .post("/products")
      .send({
        title: "Test Product",
        description: "This is a test product",
        price: 99.99,
        categoryId: 1,
        ownerId: 1,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("productId");
    productId = response.body.productId;
  });

  it("should update a product", async () => {
    const response = await request(server)
      .put(`/products/${productId}`)
      .send({
        title: "Updated Product",
        description: "Updated Description",
        price: 25.0,
        categoryId: 2,
        version: 0,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("affectedRows", 1);
  });

  it("should not update a product with a version mismatch", async () => {
    const response = await request(server)
      .put(`/products/${productId}`)
      .send({
        title: "Updated Product",
        description: "Updated Description",
        price: 25.0,
        categoryId: 2,
        version: 2,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(500);
  });

  it("should delete a product", async () => {
    const response = await request(server).delete(`/products/${productId}`).set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("affectedRows", 1);
  });
});
