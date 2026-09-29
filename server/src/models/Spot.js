const mongoose = require("mongoose");

const SKATE_FEATURE_TAGS = [
  "stairs",
  "handrail",
  "flat_bar",
  "out_rail",
  "ledge",
  "hubba",
  "manual_pad",
  "bank",
  "gap",
  "curb",
  "flat_ground",
  "wall_ride",
  "drop_in",
];
const GROUND_CONDITIONS = ["smooth", "rough", "mixed", "moderate"];
const KICK_OUT_RISK_LEVELS = ["low", "medium", "high", "very_high"];

const spotSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },
    address: { type: String, trim: true },
    tags: {
      type: [{ type: String, enum: SKATE_FEATURE_TAGS }],
      default: [],
    },
    groundCondition: { type: String, enum: GROUND_CONDITIONS },
    kickOutRisk: { type: String, enum: KICK_OUT_RISK_LEVELS },
    photoUrl: { type: String, trim: true },
    createdBy: { type: String, required: true }, // will hold the Clerk user id later
  },
  { timestamps: true },
);

module.exports = mongoose.model("Spot", spotSchema);
