import numpy as np
import glob
from pathlib import Path
from ultralytics import YOLO

MODEL_PATH = "server/models/yolov8n-face.pt"
IMAGE_DIR = "server/dataset/images"

model = YOLO(MODEL_PATH)
f = open("server/dataset/test_results.txt", "a")

for image_path in glob.glob(f"{IMAGE_DIR}/*"):
    results = model(image_path)
    f.write(f"Image: {image_path} Results: {results}\n")

f.close()
