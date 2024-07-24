const request = require("supertest");
const app = require("../app");
const { pool } = require("../config/database");
let server;
let token;
let categoryId;

describe("Category API", () => {
  beforeAll(async () => {
    await pool.execute(
      "CREATE TABLE IF NOT EXISTS owners (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))"
    );
    await pool.execute(
      "CREATE TABLE IF NOT EXISTS categories (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, ownerId INT, version INT DEFAULT 0)"
    );

    server = app.listen(5001, () => {});

    await request(server)
      .post("/auth/register")
      .send({ name: "Test Owner", email: "owner@example.com", password: "password" });

    const response = await request(server)
      .post("/auth/login")
      .send({ email: "owner@example.com", password: "password" });

    token = response.body.token;
  });

  afterAll(async () => {
    server.close();
  });

  it("should create a new category", async () => {
    const response = await request(server)
      .post("/categories")
      .send({
        title: "Test Category",
        description: "This is a test category",
        ownerId: 1,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("categoryId");
    categoryId = response.body.categoryId;
  });

  it("should update a category", async () => {
    const response = await request(server)
      .put(`/categories/${categoryId}`)
      .send({
        title: "Updated Category",
        description: "Updated Description",
        ownerId: 1,
        version: 0,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("affectedRows", 1);
  });

  it("should not update a category with a version mismatch", async () => {
    const response = await request(server)
      .put(`/categories/${categoryId}`)
      .send({
        title: "Updated Category",
        description: "Updated Description",
        version: 2,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(500);
  });

  it("should delete a category", async () => {
    const response = await request(server).delete(`/categories/${categoryId}`).set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("affectedRows", 1);
  });
});
