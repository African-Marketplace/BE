const request = require("supertest");
const server = require("./server");

describe("server.js", () => {
  it("should be the testing environment", async () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    it("server responds with 200 status code", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("server responds with JSON data", async () => {
      const res = await request(server).get("/");
      expect(res.type).toBe("application/json");
    });

    it("should return the right object", async () => {
      const res = await request(server).get("/");
      expect(res.body).toEqual({ message: "api up and running" });
    });
  });
});
