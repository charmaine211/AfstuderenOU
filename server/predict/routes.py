# Defines route endpoints and their view functions

from flask import Blueprint, request, jsonify
from flask_cors import cross_origin

from .utils import predict as utils_predict

bp = Blueprint("predict", __name__)

@bp.after_request
def add_headers(response):
    response.headers.add('Content-Type', 'application/json')
    response.headers.add('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Expose-Headers', 'Content-Type,Content-Length,Authorization,X-Pagination')
    return response

@bp.route("/predict", methods=['GET', 'POST'])
def predict():

    print("Received data to predict")
    data = request.get_json()
    # print(f"Datareceived: {data}")
    model_path = data.get("model")
    av_files = data.get("av_files")

    if not model_path or not av_files:
        return jsonify({"error": "Model path or AV files are missing"}), 400

    print("Let's predict")
    results = utils_predict(model_path, av_files)

    if results:
        return jsonify(results), 200

    return jsonify({"error": "No results generated"}), 400
