from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

# Simulating a model prediction
def fake_model_predict(data):
    amount, time, is_foreign, card_present = data
    score = amount / 1000 + (not card_present) + is_foreign + (time < 6 or time > 22)
    return 1 if score > 2 else 0

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    amount = float(data['amount'])
    time = int(data['time'])
    location = data['location'].lower()
    card_present = data['card_present'].lower() == 'yes'

    is_foreign = 0 if location == 'usa' else 1
    features = [amount, time, is_foreign, card_present]

    prediction = fake_model_predict(features)
    return jsonify({'fraud': bool(prediction)})
    
if __name__ == '__main__':
    app.run(debug=True)
