const cloudinary = require("../config/cloudinary");

async function uploadPhoto(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Convert the in-memory buffer into a base64 "data URI" — a text format
    // Cloudinary's upload function can accept directly, no temp file needed
    const base64 = req.file.buffer.toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "skate-spot-finder",
    });

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
}

module.exports = { uploadPhoto };
