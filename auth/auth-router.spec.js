const request = require("supertest");
const server = require("../api/server");
const db = require("../data/db-config");

describe("auth-router.js", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("/register", () => {
    it("responds with 201 status code", async () => {
      const user = {
        name: "testing",
        email: "testing@gmail.com",
        password: "123pop"
      };

      const res = await request(server)
        .post("/api/auth/register")
        .send(user);
      // console.log("/register", res.status);
      expect(res.status).toBe(201);
    });
  });

  describe("/login", () => {
    it("responds with 200 status code", async () => {
      const user = {
        name: "testing",
        email: "testing@gmail.com",
        password: "123pop"
      };

      const creds = {
        email: "testing@gmail.com",
        password: "123pop"
      };

      await request(server)
        .post("/api/auth/register")
        .send(user);

      const res = await request(server)
        .post("/api/auth/login")
        .send(creds);
      // console.log("login", res.status);
      expect(res.status).toBe(200);
    });
  });
});
