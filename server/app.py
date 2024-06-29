from flask import Flask
from flask_cors import CORS

from train import routes as train_routes
from collectDataset import routes as collect_routes
from predict import routes as predict_routes

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(train_routes.bp, name="train")
app.register_blueprint(collect_routes.bp, name="collectDataset")
app.register_blueprint(predict_routes.bp, name="predict")

@app.route("/")
def home():
    return "Hello, home"

if __name__ == "__main__":
    app.run(debug=True)
