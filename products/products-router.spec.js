const request = require("supertest");
const server = require("../api/server");
const db = require("../data/db-config");

describe("products-router.js", () => {
  beforeEach(async () => {
    await db("users").truncate();
    await db("products").truncate();
  });

  async function registerToken() {
    const user = {
      name: "test",
      email: "test@gmail.com",
      password: "123pop"
    };

    await request(server)
      .post("/api/auth/register")
      .send(user);

    const res = await request(server)
      .post("/api/auth/login")
      .send({ email: "test@gmail.com", password: "123pop" });

    const token = res.body.token;
    return token;
  }

  describe("GET endpoints", () => {
    it("retrieves categories", async () => {
      const token = await registerToken();
      const res = await request(server)
        .get("/api/products/cat")
        .set("authorization", token);

      // console.log("res.body", res.body);
      expect(res.status).toBe(200);
    });

    // it("gets products of specified category ID", async () => {
    //   const token = await registerToken();
    //   const res = await request(server)
    //     .get("/api/products/cat/1")
    //     .set("authorization", token);

    //   console.log(res.body);
    //   expect(res.status).toBe(200);
    // });
  });
});
