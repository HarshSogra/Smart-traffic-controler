// backend/app.js
const express = require("express");
const bodyParser = require("body-parser");
const ingestRoutes = require("./routes/ingest");
const predictRoutes = require("./routes/predict");
const trafficLightRoutes = require("./routes/traffic_light");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/ingest", ingestRoutes);
app.use("/predict", predictRoutes);
app.use("/traffic-light", trafficLightRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚦 Backend server running on port ${PORT}`);
});