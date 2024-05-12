import numpy as np
import os
import glob
import csv
from pathlib import Path
from ultralytics import YOLO

import sys

sys.path.insert(
    0,
    "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Code/AfstuderenOU/server",
)

from globals import CLASSES

MODEL_PATH = "../server/models/yolov8n-face.pt"
FACE_MODEL_PATH = "../server/models/yolov8n-face.pt"
IMAGE_DIRS = [
    "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/test/dashboard_down_right",
    "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/test/dashboard_straight_down",
    "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/test/forward",
    "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/test/forward_left",
    "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/test/left",
    "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/test/mirror_interior",
    "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/test/mirror_left",
    "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/test/mirror_right",
    "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/test/right",
    "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/test/shoulder_left",
    "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/test/shoulder_right",
]
IMAGE_DIR = "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/test/dashboard_down_right"
RESULTS_DIR = "../dataset"
FILE_DIR = "../dataset"


def predict_image_classification(path_model, image_file):
    model = YOLO(path_model)
    predictions = {}
    predictions["filename"] = image_file
    print("Model successfully uploaded")
    results = model(image_file)
    print("Results gathered")
    for result in results:
        prediction = {}
        i = 0
        for prob in result.probs:
            print(f"{result.names[i]}:{prob.data}\n")
            prediction[result.names[i]] = prob.data.item()
            i += 1
        predictions["prediction"] = prediction

    return predictions


def predict_object_detection(path_model, image_file):
    # <class> <x_center> <y_center> <width> <height>
    model = YOLO(path_model)
    predictions = {}
    predictions["filename"] = image_file
    txt_file = os.path.basename(image_file).split(".")[0]
    print("Model successfully uploaded")
    results = model(image_file)
    print("Results gathered")
    for result in results:
        prediction = {}
        i = 0
        result.save_txt(txt_file)
        # result.show()
        for box in result.boxes:
            print(f"{result.names[i]}:{box.xywhn}\n")
            prediction[result.names[i]] = box.xywhn
            i += 1
        predictions["prediction"] = prediction

    return predictions


def create_csv(data, title):
    print("Create CSV")
    csv_file_path = os.path.join(RESULTS_DIR, f"{title}.csv")

    if not os.path.exists(csv_file_path) or os.path.getsize(csv_file_path) == 0:
        with open(csv_file_path, "w", newline="") as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["Filename", "Class", "Probability"])

    with open(csv_file_path, "a", newline="") as csvfile:
        writer = csv.writer(csvfile)

        filename = os.path.basename(data.get("filename"))

        for key, value in data["prediction"].items():
            writer.writerow([filename, key, value])

    print("CSV succesfully created")


def label_frame(image_file, label_id, result_dir):
    model = YOLO(FACE_MODEL_PATH)
    txt_file = os.path.basename(image_file).split(".")[0]
    results = model(image_file)
    results_path = os.path.join(result_dir, txt_file)

    for result in results:
        result.save_txt(results_path)

    with open(results_path, "r+") as file:
        first_line = file.readline().strip().split()
        first_line[0] = str(label_id)
        file.seek(0)
        file.write(" ".join(first_line))
        file.truncate()


def label_dataset():
    for image_dir in IMAGE_DIRS:
        label_id = CLASSES().get(os.path.basename(image_dir))
        print(f" {os.path.basename(image_dir)}: label_id: {label_id}")
        break


def main():

    print("***PREDICTION***")
    label_dataset()
    # for image_dir in IMAGE_DIRS:

    #     for image_path in glob.glob(f"{image_dir}/*"):
    #         label_frame(image_path, 10, RESULTS_DIR)
    # prediction = predict_object_detection(MODEL_PATH, image_path)
    # create_csv(prediction, os.path.basename(MODEL_PATH))

    # model = YOLO(MODEL_PATH)
    # f = open(f"{FILE_DIR}/test_results.txt", "a")
    # print("File opened")

    # for image_path in glob.glob(f"{IMAGE_DIR}/*"):
    #     prediction = {}
    #     results = model(image_path)
    #     f.write(f"\nImage: {image_path}\n")

    #     for result in results:
    #         f.write("Classes: \n")
    #         classes = result.names.values()
    #         f.write(f"{classes}")
    #         i = 0
    #         for prob in result.probs:
    #             #  f.write(f"{result.names[i]}:{prob.data}\n")
    #             i += 1

    # f.close()


if __name__ == "__main__":
    main()
