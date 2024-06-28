# Initialises module and imports necessary components

from flask import Blueprint

bp = Blueprint("predict", __name__)

from predict import routes
