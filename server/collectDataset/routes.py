# Defines route endpoints and their view functions
from flask import Blueprint, request, jsonify
from .utils import label_dataset

bp = Blueprint("collect-data", __name__)


@bp.after_request
def add_headers(response):
    response.headers.add("Content-Type", "application/json")
    response.headers.add(
        "Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS"
    )
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add(
        "Access-Control-Expose-Headers",
        "Content-Type,Content-Length,Authorization,X-Pagination",
    )
    return response


@bp.route("/collect-data", methods=["GET", "POST"])
def collect_data():

    print("Received data to collect")
    data = request.get_json()
    dataset_dir = data.get("dataset_dir")
    labels_dir = data.get("labels_dir")
    images_dir = data.get("images_dir")

    success = label_dataset(dataset_dir, labels_dir, images_dir)

    if success:
        return jsonify(success), 200

    return (
        jsonify(
            {
                "error": "Invalid input: 'dataset_dir', 'labels_dir', or 'images_dir' is missing or incorrect."
            }
        ),
        400,
    )
