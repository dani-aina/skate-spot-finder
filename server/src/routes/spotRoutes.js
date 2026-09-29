const express = require("express");
const { requireAuth } = require("@clerk/express");
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
router.post("/", requireAuth(), createSpot);
router.put("/:id", requireAuth(), updateSpot);
router.patch("/:id", requireAuth(), updateSpot);
router.delete("/:id", requireAuth(), deleteSpot);

module.exports = router;
