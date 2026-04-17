const request = require("supertest");
const app = require("../app");

describe("User Preferences", () => {
  let token;

  beforeAll(async () => {
    const email = `user${Date.now()}@gmail.com`;
    const password = "123456";

    await request(app).post("/auth/register").send({ email, password });

    const res = await request(app)
      .post("/auth/login")
      .send({ email, password });

    token = res.body.token;
  });

  test("Update preferences", async () => {
    const res = await request(app)
      .post("/user/preferences")
      .set("Authorization", `Bearer ${token}`)
      .send({
        categories: ["gold", "fintech"],
        deliveryTime: "20:00"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.categories.length).toBeGreaterThan(0);
  });
});

afterAll(async () => {
  const mongoose = require("mongoose");
  await mongoose.connection.close();
});