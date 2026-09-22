const Spot = require("../models/Spot");

// GET /api/spots
async function getSpots(req, res, next) {
  try {
    const { tag } = req.query;
    const filter = tag ? { tags: tag } : {};
    const spots = await Spot.find(filter).sort({ createdAt: -1 });
    res.json(spots);
  } catch (err) {
    next(err);
  }
}

// GET /api/spots/:id
async function getSpotById(req, res, next) {
  try {
    const spot = await Spot.findById(req.params.id);
    if (!spot) return res.status(404).json({ message: "Spot not found" });
    res.json(spot);
  } catch (err) {
    next(err);
  }
}

// POST /api/spots
async function createSpot(req, res, next) {
  try {
    const spot = await Spot.create(req.body);
    res.status(201).json(spot);
  } catch (err) {
    next(err);
  }
}

// PUT /api/spots/:id
async function updateSpot(req, res, next) {
  try {
    const spot = await Spot.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!spot) return res.status(404).json({ message: "Spot not found" });
    res.json(spot);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/spots/:id
async function deleteSpot(req, res, next) {
  try {
    const spot = await Spot.findByIdAndDelete(req.params.id);
    if (!spot) return res.status(404).json({ message: "Spot not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { getSpots, getSpotById, createSpot, updateSpot, deleteSpot };
