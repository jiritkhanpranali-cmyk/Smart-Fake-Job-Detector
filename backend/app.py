from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import pickle

app = Flask(__name__)
CORS(app)

# ---------------- MONGODB CONNECTION ----------------
client = MongoClient("mongodb://localhost:27017/")
db = client["jobdb"]

users = db["users"]
predictions = db["predictions"]

# ---------------- LOAD ML MODEL ----------------
model = pickle.load(open("model.pkl", "rb"))

# ---------------- HOME ----------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Smart Fake Job Detector Backend Running"
    })

# ---------------- REGISTER ----------------
@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.json

        if users.find_one({"email": data["email"]}):
            return jsonify({"message": "Email already exists"}), 400

        users.insert_one({
            "name": data["name"],
            "email": data["email"],
            "password": data["password"]
        })

        return jsonify({"message": "Registered Successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------- LOGIN ----------------
# ---------------- LOGIN ----------------
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json

        user = users.find_one({
            "email": data["email"],
            "password": data["password"]
        })

        if user:
            return jsonify({
                "success": True,
                "message": "Login Successful"
            })

        return jsonify({
            "success": False,
            "message": "Invalid Credentials"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------- PREDICT ----------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        text = request.json["text"].strip()

        if not text:
            return jsonify({"error": "Text is required"}), 400

        prediction = model.predict([text])[0]
        probs = model.predict_proba([text])[0]

        genuine_prob = round(probs[0] * 100, 2)
        fake_prob = round(probs[1] * 100, 2)

        if fake_prob >= 70:
            result = "Fake Job"
            confidence = fake_prob
        elif fake_prob >= 40:
            result = "Suspicious"
            confidence = fake_prob
        else:
            result = "Genuine Job"
            confidence = genuine_prob

        output = {
            "result": result,
            "confidence": confidence,
            "fake_probability": fake_prob,
            "genuine_probability": genuine_prob
        }

        # Check duplicate before insert
        existing = predictions.find_one({"text": text})

        if not existing:
            predictions.insert_one({
                "text": text,
                "result": result,
                "confidence": confidence,
                "fake_probability": fake_prob,
                "genuine_probability": genuine_prob
            })

        return jsonify(output)

    except Exception as e:
        print("Predict ERROR:",e)
        return jsonify({"error": str(e)}), 500

# ---------------- ADMIN STATS ----------------
@app.route("/admin/stats", methods=["GET"])
def admin_stats():
    return jsonify({
        "total_predictions": predictions.count_documents({}),
        "fake_jobs": predictions.count_documents({"result": "Fake Job"}),
        "suspicious_jobs": predictions.count_documents({"result": "Suspicious"}),
        "genuine_jobs": predictions.count_documents({"result": "Genuine Job"}),
        "total_users": users.count_documents({})
    })

# ---------------- GET USERS (ADMIN) ----------------
@app.route("/admin/users", methods=["GET"])
def admin_users():
    all_users = list(users.find({}, {"password": 0}))

    for u in all_users:
        u["_id"] = str(u["_id"])

    return jsonify(all_users)

# ---------------- HISTORY ----------------
@app.route("/history", methods=["GET"])
def history():
    data = list(predictions.find({}, {"_id": 0}))
    return jsonify(data)

# ---------------- ALL USERS ----------------
@app.route("/allusers")
def allusers():
    data = []

    for user in users.find():
        user["_id"] = str(user["_id"])
        data.append(user)

    return jsonify(data)

# ---------------- RUN SERVER ----------------
if __name__ == "__main__":
    app.run(debug=True)
