const express = require("express");
const { requireApiAuth } = require("../middleware/requireApiAuth");
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
router.post("/", requireApiAuth, createSpot);
router.put("/:id", requireApiAuth, updateSpot);
router.patch("/:id", requireApiAuth, updateSpot);
router.delete("/:id", requireApiAuth, deleteSpot);

module.exports = router;
