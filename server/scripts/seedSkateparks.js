require("dotenv").config();
const connectDB = require("../src/config/db");
const Spot = require("../src/models/Spot");

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

// Rough bounding box covering greater Sydney: south,west,north,east
const SYDNEY_BBOX = "-34.2,150.5,-33.4,151.4";

const query = `
  [out:json][timeout:25];
  (
    node["leisure"="skatepark"](${SYDNEY_BBOX});
    way["leisure"="skatepark"](${SYDNEY_BBOX});
  );
  out center tags;
`;

async function fetchSydneySkateparks() {
  const res = await fetch(OVERPASS_URL, {
    method: "POST",
    body: `data=${encodeURIComponent(query)}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  if (!res.ok) throw new Error(`Overpass request failed: ${res.status}`);

  const data = await res.json();
  return data.elements;
}

function toSpot(element, index) {
  // Points have lat/lon directly; larger shapes get a "center" point instead
  const lat = element.lat ?? element.center?.lat;
  const lon = element.lon ?? element.center?.lon;
  if (lat == null || lon == null) return null;

  const name = element.tags?.name || `Sydney Skatepark ${index + 1}`;

  return {
    name,
    description: "Public skatepark (imported from OpenStreetMap)",
    location: { type: "Point", coordinates: [lon, lat] },
    tags: [],
    createdBy: "openstreetmap-import",
  };
}

async function seed() {
  await connectDB();

  console.log("Fetching Sydney skateparks from OpenStreetMap...");
  const elements = await fetchSydneySkateparks();
  console.log(`Found ${elements.length} skateparks`);

  const spots = elements.map(toSpot).filter(Boolean);
  const inserted = await Spot.insertMany(spots);
  console.log(`Inserted ${inserted.length} skateparks into the database`);

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
