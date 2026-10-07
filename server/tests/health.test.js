require("dotenv").config();
const supertest = require("supertest");
const app = require("../src/app");

describe("GET /api/health", () => {
  it("returns 200 and status ok", async () => {
    const res = await supertest(app).get("/api/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
