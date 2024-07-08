# Initialises module and imports necessary components

from flask import Blueprint

bp = Blueprint("collect-data", __name__)

from collectDataset import routes