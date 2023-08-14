from flask import Flask, request, jsonify
import json

app = Flask(__name__)


@app.route("/")
def index():
    return "Web to keep Alive bot"


@app.route("/db/get")
def get_db():
    with open("db.json", "r") as f:
        return jsonify(json.load(f))


@app.route("/db/set", methods=["POST"])
def set_db():
    with open("db.json", "w") as f:
        json.dump(request.json, f, indent=1)
    return "OK"


@app.route("/db/gallery_exists", methods=["POST"])
def gallery_exists():
    with open("db.json", "r") as f:
        db = json.load(f)
    return jsonify(db.get(request.json["channel_id"], False))


@app.route("/db/add_gallery", methods=["POST"])
def add_gallery():
    with open("db.json", "r") as f:
        db = json.load(f)
    db[request.json["channel_id"]] = request.json["channel_data"]
    with open("db.json", "w") as f:
        json.dump(db, f, indent=1)
    return "OK"


app.run(host="0.0.0.0")