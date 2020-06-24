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

  const data = {
    product_name: "banana",
    description: "ripe",
    price: 3,
    location: "Nairobi"
  };

  describe("GET endpoints", () => {
    it("retrieves all categories", async () => {
      const token = await registerToken();
      const res = await request(server)
        .get("/api/products/cat")
        .set("authorization", token);

      expect(res.status).toBe(200);
    });

    it("retrieves all products with specified category ID", async () => {
      const token = await registerToken();
      await request(server)
        .post("/api/products/cat/4")
        .send(data)
        .set("authorization", token);

      const res = await request(server)
        .get("/api/products/cat/4")
        .set("authorization", token);
      // console.log("GET /cat/:categoryID", res.body);
      expect(res.status).toBe(200);
    });

    it("retrieves all products listed by user", async () => {
      const token = await registerToken();
      await request(server)
        .post("/api/products/cat/4")
        .send(data)
        .set("authorization", token);

      const res = await request(server)
        .get("/api/products/my")
        .set("authorization", token);
      // console.log("GET /my", res.body);
      expect(res.status).toBe(200);
    });
  });

  describe("POST endpoints", () => {
    it("adds product and assigns specified category ID from params", async () => {
      const token = await registerToken();
      const res = await request(server)
        .post("/api/products/cat/4")
        .send(data)
        .set("authorization", token);

      const result = {
        id: 1,
        product_name: "banana",
        description: "ripe",
        price: 3,
        category_id: 4,
        location_id: 5,
        seller_id: 1
      };
      expect(res.body).toEqual(result);
    });
  });

  describe("PUT endpoints", () => {
    it("updates product with specified ID", async () => {
      const token = await registerToken();
      await request(server)
        .post("/api/products/cat/4")
        .send(data)
        .set("authorization", token);

      const res = await request(server)
        .put("/api/products/my/1")
        .send({
          product_name: "Banana",
          description: "Ripe",
          price: 3,
          location: "Nairobi",
          category: "Fruits"
        })
        .set("authorization", token);

      expect(res.body).toEqual({ updatedCount: 1 });
    });
  });

  describe("DELETE endpoints", () => {
    it("should remove product with specified ID", async () => {
      const token = await registerToken();
      await request(server)
        .post("/api/products/cat/4")
        .send(data)
        .set("authorization", token);

      const res = await request(server)
        .delete("/api/products/my/1")
        .set("authorization", token);

      expect(res.body).toEqual({ removedCount: 1 });
    });
  });
});
