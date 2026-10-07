require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/app");

describe("Spot routes require authentication", () => {
  it("rejects POST /api/spots with 401 when not signed in", async () => {
    const res = await supertest(app)
      .post("/api/spots")
      .send({
        name: "Unauthorized Test Spot",
        location: { type: "Point", coordinates: [151.2093, -33.8688] },
      });

    expect(res.statusCode).toBe(401);
  });

  it("rejects PUT /api/spots/:id with 401 when not signed in", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await supertest(app)
      .put(`/api/spots/${fakeId}`)
      .send({ name: "Hacked" });

    expect(res.statusCode).toBe(401);
  });

  it("rejects DELETE /api/spots/:id with 401 when not signed in", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await supertest(app).delete(`/api/spots/${fakeId}`);

    expect(res.statusCode).toBe(401);
  });
});
