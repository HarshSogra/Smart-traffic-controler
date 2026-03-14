// backend/routes/ingest.js
const express = require("express");
const router = express.Router();
const { analyzeTraffic } = require("../services/decision_engine");
const { callPythonML } = require("../services/ml_service");

// Receive live IoT data
router.post("/", async (req, res) => {
  try {
    const data = req.body; // { vehicle_count, speed, weather, hour, junction_id }

    // Call Python ML service for predictions
    const mlPrediction = await callPythonML(data);

    // Analyze traffic with decision engine
    const result = analyzeTraffic(data, mlPrediction);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;