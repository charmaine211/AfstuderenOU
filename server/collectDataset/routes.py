from flask import Blueprint

bp = Blueprint("collectDataset", __name__)


@bp.route("/collect-data")
def collect_data():
    return "Data collected successfully"
