require("dotenv").config();
const connectDB = require("../src/config/db");
const Spot = require("../src/models/Spot");

const seedSpots = [
  {
    name: "Cannon Ball",
    description:
      "Shaded plaza with windowsill ledge, 3 to 4 stairs, manual pad and statue gap.",
    address: "Macquarie Place Park, Sydney.",
    location: {
      type: "Point",
      coordinates: [151.2093 /* longitude */, -33.8651 /* latitude */],
    },
    tags: ["stairs", "manual_pad", "ledge", "gap"], // stairs, handrail, flat_rail, round_rail, ledge, hubba, manual_pad, bank, gap, curb
    groundCondition: "smooth", // "smooth" | "rough" | "mixed" | "moderate"
    kickOutRisk: "low", // "low" | "medium" | "high" | "very_high"
    createdBy: "seed-script",
  },
  {
    name: "Walk-way Ledges",
    description: "Knee high ledges along a paved walkway.",
    address: "The University of Sydney Law School",
    location: {
      type: "Point",
      coordinates: [151.1905, -33.8874],
    },
    tags: ["ledge"],
    groundCondition: "smooth",
    kickOutRisk: "high",
    createdBy: "seed-script",
  },
  {
    name: "3 Pad",
    description: "Flat gap to manual pad",
    address: "12 Palmer St, Parramatta NSW 2150",
    location: {
      type: "Point",
      coordinates: [151.0064, -33.8093],
    },
    tags: ["manual_pad"],
    groundCondition: "mixed",
    kickOutRisk: "high",
    createdBy: "seed-script",
  },
  {
    name: "Dane Brady car park",
    description: "Lawless carpark with gap over fence. Make your own spot.",
    address: "22 Taylor St, Glebe NSW 2037",
    location: {
      type: "Point",
      coordinates: [151.1878267078462, -33.87628989250559],
    },
    tags: ["gap"],
    groundCondition: "rough",
    kickOutRisk: "low",
    createdBy: "seed-script",
  },
  {
    name: "Cook 'n' Phil",
    description:
      "Bluestone tile and cobble stone plaza with stairs, manual pad and slappy ledge across a cobble stone flat gap.",
    address: "St Marys Rd, Sydney NSW 2000",
    location: {
      type: "Point",
      coordinates: [151.21330394232749, -33.87076291141105],
    },
    tags: ["stairs", "manual_pad", "ledge", "flat_ground"],
    groundCondition: "smooth",
    kickOutRisk: "medium",
    createdBy: "seed-script",
  },
  {
    name: "Aquatic centre banks",
    description: "Several downhill bank to walls, fs for goofy.",
    address: "Cnr Codrington St and Darlington Ln, Darlington NSW 2008",
    location: {
      type: "Point",
      coordinates: [151.191283, -33.891295],
    },
    tags: ["wall_ride"],
    groundCondition: "mixed",
    kickOutRisk: "high",
    createdBy: "seed-script",
  },
  {
    name: "UTS volcano",
    description: "Volcano shaped bank with thick square coping on top.",
    address: "Building K, 67 Thomas St, Ultimo NSW 2007",
    location: {
      type: "Point",
      coordinates: [151.20030131349125, -33.88288119047025],
    },
    tags: ["bank"],
    groundCondition: "smooth",
    kickOutRisk: "very_high",
    createdBy: "seed-script",
  },
];

async function seed() {
  await connectDB();

  // Only remove spots THIS script created before — so re-running it never
  // touches spots you or someone else added through the app or Postman
  const removed = await Spot.deleteMany({ createdBy: "seed-script" });
  console.log(`Removed ${removed.deletedCount} old seed spots`);

  const inserted = await Spot.insertMany(seedSpots);
  console.log(`Inserted ${inserted.length} spots into the database`);

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
