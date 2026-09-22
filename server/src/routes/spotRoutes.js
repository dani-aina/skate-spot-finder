const express = require("express");
const {
  getSpots,
  getSpotById,
  createSpot,
  updateSpot,
  deleteSpot,
} = require("../controllers/spotController");

const router = express.Router();

router.get("/", getSpots);
router.get("/:id", getSpotById);
router.post("/", createSpot);
router.put("/:id", updateSpot);
router.delete("/:id", deleteSpot);

module.exports = router;
