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
    createdBy: { type: String, required: true }, // will hold the Clerk user id later
  },
  { timestamps: true },
);

module.exports = mongoose.model("Spot", spotSchema);
