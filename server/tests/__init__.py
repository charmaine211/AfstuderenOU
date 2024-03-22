from flask import Flask # type: ignore

app = Flask(__name__)

@app.route('/')
def homepage():
    return {"message": "Hi there, how ya doin?"}


if __name__ == "__main__":
    app.run()