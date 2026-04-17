const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {
  let email = `test${Date.now()}@gmail.com`;
  let password = "123456";

  test("Register user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email, password });

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(email);
  });

  test("Login user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email, password });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});

afterAll(async () => {
  const mongoose = require("mongoose");
  await mongoose.connection.close();
});