const multer = require("multer");

// Keep the uploaded file in memory (as a buffer) instead of saving it to disk —
// we're just passing it straight through to Cloudinary, so there's nothing to store locally
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
