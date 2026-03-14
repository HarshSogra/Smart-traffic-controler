// backend/services/decision_engine.js

function analyzeTraffic(iotData, mlData) {
  const { vehicle_count } = iotData;
  const { current_congestion, future_congestion } = mlData;

  // Base congestion score
  let score = vehicle_count * 0.5 + current_congestion * 2 + future_congestion * 2;

  // Determine status
  let status = "LOW";
  if (score > 15) status = "HIGH";
  else if (score > 7) status = "MEDIUM";

  // Example: determine green light duration
  let greenLightSec = 30;
  if (status === "HIGH") greenLightSec = 60;
  else if (status === "MEDIUM") greenLightSec = 45;

  return {
    status,
    score,
    greenLightSec,
    mlPrediction: mlData
  };
}

module.exports = { analyzeTraffic };