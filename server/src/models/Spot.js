const mongoose = require("mongoose");

const SKATE_FEATURE_TAGS = [
  "stairs",
  "handrail",
  "flat_rail",
  "round_rail",
  "ledge",
  "hubba",
  "manual_pad",
  "bank",
  "gap",
  "curb",
];
const GROUND_CONDITIONS = ["smooth", "rough", "mixed"];
const BUST_RISK_LEVELS = ["low", "medium", "high"];

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
    bustRisk: { type: String, enum: BUST_RISK_LEVELS },
    createdBy: { type: String, required: true }, // will hold the Clerk user id later
  },
  { timestamps: true },
);

module.exports = mongoose.model("Spot", spotSchema);
