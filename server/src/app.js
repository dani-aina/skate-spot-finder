const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const spotRoutes = require("./routes/spotRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/spots", spotRoutes);
app.use("/api/upload", uploadRoutes);
app.use(errorHandler);

module.exports = app;
