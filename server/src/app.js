const express = require("express");
const cors = require("cors");
const spotRoutes = require("./routes/spotRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/spots", spotRoutes);

app.use(errorHandler);

module.exports = app;
