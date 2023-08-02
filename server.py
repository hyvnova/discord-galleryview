"""
This file is the main file for the server. It will handle all the requests from the bot and the web app.
Objectives:
    - Dinamically create a web page with that will serve as a gallery for the media in a discord channel.
    - Lazy load the media from the channel to the web app. (Through sockets) (Maybe)
    - Unique URL for each gallery.


Routes:
    < API >
    - /api/create_gallery (POST): Create a gallery for a channel. Supposed to be called from bot. Gets: `channel_id`, `channel_name` `images` (List of tuples containing url and name). Returns: `gallery_url`.

    < WEB APP >
    - /gallery/<gallery_id> (GET): Get the gallery page.
"""

from typing import List, Tuple
from flask import Flask, request, jsonify, url_for, render_template
import json
from flask_fontawesome import FontAwesome
from discord_api import get_channel_images, get_channel_name


app = Flask(__name__)
fa = FontAwesome(app)

HOST = "http://192.168.1.151:5000"


@app.route("/")
def index():
    return render_template("index.html")


test_images = [
    (
        "https://media.discordapp.net/attachments/1133572126415261857/1134252439399317575/image.png?width=295&height=451",
        "Image 1",
    ),
    (
        "https://media.discordapp.net/attachments/1133572126415261857/1134252371602579607/image.png?width=257&height=451",
        "Long ass goofy name",
    ),
    (
        "https://media.discordapp.net/attachments/1133572126415261857/1134212506534027465/image.png?width=200&height=451",
        "s",
    ),
]


# TEST ROUTE
@app.route("/test")
def test():
    # return index template
    return render_template(
        "gallery.html",
        channel_name="test name",
        channel_id="123",
        images=test_images,
    )


@app.route("/gallery/<gallery_id>")
def gallery(gallery_id):
    # get data
    with open("./views.json", "r") as f:
        data = json.load(f)

    # check if gallery exists
    if gallery_id not in data:
        return jsonify({"error": "Gallery not found."}), 404

    # get gallery data
    gallery_data = data[gallery_id]

    images = gallery_data["images"]
    chunk_size = 5
    images_set = [images[i : i + chunk_size] for i in range(0, len(images), chunk_size)]

    # return index template
    return render_template(
        "gallery.html",
        channel_name=gallery_data["channel_name"],
        channel_id=gallery_id,
        images_set=images_set,
    )


def create_gallery_page(channel_id: str, channel_name: str, images: List[Tuple]):
    data: Dict[str, Dict] = json.load(open("./views.json", "r"))

    # check if channel already has a gallery
    if channel_id in data.keys():
        if len(data[channel_id]["images"]) == len(images):
            return jsonify(
                {"gallery_url": HOST + url_for("gallery", gallery_id=channel_id)}
            )

        else:
            # delete old gallery
            del data[channel_id]

    # create gallery url
    data[channel_id] = {
        "channel_name": channel_name,
        "images": images,
    }

    # save data
    with open("./views.json", "w") as f:
        json.dump(data, f, indent=4)

    # return gallery url
    return jsonify({"gallery_url": HOST + url_for("gallery", gallery_id=channel_id)})


@app.route("/api/create_gallery", methods=["POST"])
def create_gallery():
    req_data = request.json

    # parse req_data
    channel_id = req_data.get("channel_id")
    channel_name = req_data.get("channel_name")
    images = req_data.get("images")

    if not all([channel_id, channel_name, images]):
        return (
            jsonify(
                {
                    "error": "Missing data. Required fields: channel_id, channel_name, images"
                }
            ),
            400,
        )

    return create_gallery_page(channel_id, channel_name, images)


@app.route("/api/create_gallery_scrapping", methods=["POST"])
def create_gallery_scrapping():
    """
    Create a gallery from a channel by scrapping the channel.

    Request:
        - channel_id: str
        - amount: int
        - authorization: str (Discord Token)
    """

    req_data = request.json

    # parse req_data
    channel_id = req_data.get("channel_id")
    amount = req_data.get("amount")
    authorization = req_data.get("authorization")

    print(req_data)

    if not all([channel_id, amount, authorization]):
        return (
            jsonify(
                {
                    "error": "Missing data. Required fields: channel_id, amount, authorization"
                }
            ),
            400,
        )

    try:
        amount = int(amount)
    except ValueError:
        return jsonify({"error": "Amount must be an integer."}), 400

    # get images
    images = get_channel_images(authorization, channel_id, amount)

    if not images:
        return (
            jsonify(
                {"error": "Error retrieving images. Make sure authorization is valid."}
            ),
            500,
        )

    channel_name = get_channel_name(authorization, channel_id)

    if not channel_name:
        return (
            jsonify(
                {
                    "error": "Error retrieving channel name. Make sure authorization is valid."
                }
            ),
            500,
        )

    return create_gallery_page(channel_id, channel_name, images)


app.run(host="0.0.0.0", debug=True)
