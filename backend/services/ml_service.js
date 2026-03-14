// backend/services/ml_service.js
const axios = require("axios");

const PYTHON_ML_URL = "http://127.0.0.1:5001/predict";

async function callPythonML(data) {
  try {
    const response = await axios.post(PYTHON_ML_URL, data);
    return response.data; // { current_congestion, future_congestion }
  } catch (err) {
    console.error("ML service error:", err.message);
    return { current_congestion: 0, future_congestion: 0 };
  }
}

module.exports = { callPythonML };