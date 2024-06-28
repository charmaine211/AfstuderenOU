# Defines route endpoints and their view functions

from flask import Blueprint

bp = Blueprint("predict", __name__)


@bp.route("/predict")
def collect_data():

    return "Predict successfully"
