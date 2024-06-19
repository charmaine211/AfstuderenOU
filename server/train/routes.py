# Defines route endpoints and their view functions

from flask import Blueprint

bp = Blueprint("train", __name__)


@bp.route("/train")
def collect_data():
    return "Train successfully"
