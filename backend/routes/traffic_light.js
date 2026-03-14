// backend/routes/traffic_light.js
const express = require("express");
const router = express.Router();
const { analyzeTraffic } = require("../services/decision_engine");
const { callPythonML } = require("../services/ml_service");

// Endpoint to simulate syncing lights across city
router.post("/sync", async (req, res) => {
  const junctions = req.body.junctions; // array of junction IoT data
  let results = [];

  for (let data of junctions) {
    const mlPrediction = await callPythonML(data);
    const analysis = analyzeTraffic(data, mlPrediction);
    results.push({ junction_id: data.junction_id, ...analysis });
  }

  res.json({ syncedTraffic: results });
});

module.exports = router;