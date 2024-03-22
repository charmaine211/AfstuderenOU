from flask import Blueprint

bp = Blueprint("collectDataset", __name__)

from train import routes
