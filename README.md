# Driver Gaze Detection

## Run application

To run both the backend and frontend of your application simultaneously, open two separate terminal windows or tabs. In one terminal, start the backend server, and in the other, launch the frontend interface. This ensures that both components can operate concurrently.

### Run Python backend

#### Initial Setup

1. Navigate to the backend directory. Adjust the path as needed:

```
cd AfstuderenOU/server/
```

2. Create a virtual environment. Use either python or python3, depending on your system:

```
python -m venv venv
```

3. Activate the virtual environment based on your operating system:

_Windows:_

```
venv\Scripts\activate
```

_macOS and Linux:_

```
source venv/bin/activate
```

4. Install the required dependencies into the virtual environment. Use pip or pip3 depending on your system:

```
pip install -r requirements.txt
```

#### Running the Backend

```
python app.py
```

### Run React frontend

#### Initial Setup

1. Go to frontend directory, change the path accordingly

```
cd AfstuderenOU/client/
```

2. Install packages

```
npm
```

#### Running the Frontend

```
npm start
```

## Instructions

- [Collect dataset](./documentation/COLLECTDATASET.md)
- [Train with YOLOv8](./documentation/TRAIN.md)
- [Predict with trained model](./documentation/PREDICT.md)
- [How to build application for publishing](./documentation/APPLICATION_BUILD.md)
