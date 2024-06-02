from flask import Blueprint, request, jsonify
import os
from werkzeug.utils import secure_filename

from models import predict

bp = Blueprint("predict", __name__)


@bp.route("/predict")
def predict():

    data = request.get_json()
    model_path = data.get("model")
    av_files = data.get("av_files")

    if not model_path or not av_files:
        return jsonify({"error": "Model path or AV files are missing"}), 400

    result = predict(model_path, av_files)
    return jsonify(result)
