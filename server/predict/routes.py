# Defines route endpoints and their view functions

from flask import Blueprint, request, jsonify
import os
from werkzeug.utils import secure_filename

from .utils import predict as utils_predict

bp = Blueprint("predict", __name__)

@bp.route("/predict", methods=['GET', 'POST'])
def predict():

    print("PREDICT")
    # data = request.get_json()
    # print(f"Datareceived: {data}")
    # model_path = data.get("model")
    # av_files = data.get("av_files")

    # if not model_path or not av_files:
    #     return jsonify({"error": "Model path or AV files are missing"}), 400

    # print("Let's predict")
    # result = utils_predict(model_path, av_files)
    result={}
    return jsonify(result)
