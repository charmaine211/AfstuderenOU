# Initialises module and imports necessary components

from flask import Blueprint

bp = Blueprint("train", __name__)

from train import routes
