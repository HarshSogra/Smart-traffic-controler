# backend/python_api/ml_server.py

from flask import Flask, request, jsonify
import joblib
import pandas as pd
import os

app = Flask(__name__)

# -----------------------------
# Load models
# -----------------------------
BASE_DIR = os.path.join(os.path.dirname(__file__), "../models")
traffic_model_path = os.path.join(BASE_DIR, "traffic_model.pkl")
future_model_path = os.path.join(BASE_DIR, "traffic_model_future.pkl")
encoder_path = os.path.join(BASE_DIR, "encoder.pkl")

traffic_model = joblib.load(traffic_model_path)
future_model = joblib.load(future_model_path)
encoders = joblib.load(encoder_path)

# -----------------------------
# Prediction route
# -----------------------------
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    df = pd.DataFrame([data])

    # Encode categorical features if any
    for col, le in encoders.items():
        if col in df.columns:
            df[col] = le.transform(df[col])

    # Current congestion prediction
    current_pred = traffic_model.predict(df)[0]

    # Future congestion prediction
    future_pred = future_model.predict(df)[0]

    return jsonify({
        "current_congestion": int(current_pred),
        "future_congestion": int(future_pred)
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)