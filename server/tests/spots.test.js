require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/app");
const Spot = require("../src/models/Spot");

let testSpot;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST);

  testSpot = await Spot.create({
    name: "Test Spot for Jest",
    location: { type: "Point", coordinates: [151.2093, -33.8688] },
    createdBy: "test-user",
  });
});

afterAll(async () => {
  await Spot.deleteMany({ createdBy: "test-user" });
  await mongoose.connection.close();
});

describe("GET /api/spots", () => {
  it("returns 200 and an array of spots", async () => {
    const res = await supertest(app).get("/api/spots");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("GET /api/spots/:id", () => {
  it("returns the matching spot for a real id", async () => {
    const res = await supertest(app).get(`/api/spots/${testSpot._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Test Spot for Jest");
  });

  it("returns 404 for an id that doesn't exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await supertest(app).get(`/api/spots/${fakeId}`);

    expect(res.statusCode).toBe(404);
  });
});
