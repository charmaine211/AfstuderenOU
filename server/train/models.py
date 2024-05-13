import numpy as np
import os
import glob
import csv
from pathlib import Path
from ultralytics import YOLO

import sys
import shutil

sys.path.insert(
    0,
    "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Code/AfstuderenOU/server",
)

from globals import CLASSES, YOLO_IMAGE_EXTENTIONS

MODEL_PATH = "../server/models/yolov8n-face.pt"
FACE_MODEL_PATH = "../server/models/yolov8n-face.pt"
IMAGE_DIRS = [
    "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/test/dashboard_down_right",
    "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/train/dashboard_straight_down",
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

DATASET_DIR = "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification"

TRAIN_DIR = "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/train"
TEST_DIR = "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/test"
VAL_DIR = "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/image_classification/val"

IMAGES_TRAIN_DIR = "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/object_detection/labels/train"
IMAGES_TEST_DIR = "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/object_detection/labels/test"
IMAGES_VAL_DIR = "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/object_detection/labels/val"

IMAGES_DIR = "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/object_detection/images"
LABELS_DIR = "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/object_detection/labels"

LABELS_TRAIN_DIR = "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/object_detection/labels/train"
LABELS_TEST_DIR = "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/object_detection/labels/test"
LABELS_VAL_DIR = "C:/Users/charm/Documents/Informatica/Postpropodeuse/Voorbereiden Afstuderen/Dataset/recording_10042024_Wim_v1/dataset/object_detection/labels/val"


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
    """Summary or Description of the Function

    Parameters:
    argument1 (int): Description of arg1

    Returns:
    int:Returning value

    """
    model = YOLO(path_model)
    predictions = {}
    predictions["filename"] = image_file
    txt_file = os.path.basename(image_file).split(".")[0]
    print("Model successfully uploaded")
    results = model(image_file)
    print("Results gathered")
    for result in results:
        # prediction = {}
        # i = 0
        # result.save_txt(txt_file)
        result.show()
        # for box in result.boxes:
        #     print(f"{result.names[i]}:{box.xywhn}\n")
        #     prediction[result.names[i]] = box.xywhn
        #     i += 1
        # predictions["prediction"] = prediction

    return predictions


def create_csv(data, title):
    """Summary or Description of the Function

    Parameters:
    argument1 (int): Description of arg1

    Returns:
    int:Returning value

    """
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


def valid_ultralytics_image_type(image_path):
    ext = os.path.splitext(image_path)[1]
    return YOLO_IMAGE_EXTENTIONS().count(ext) > 0


def label_frame(image_file, label_id, result_dir):
    """Summary or Description of the Function

    Parameters:
    argument1 (int): Description of arg1

    Returns:
    int:Returning value

    """
    model = YOLO(FACE_MODEL_PATH)
    txt_file = os.path.basename(image_file).split(".")[0]
    results = model(image_file)
    results_path = os.path.join(result_dir, f"{txt_file}.txt")

    if os.path.exists(results_path):
        print("File already exists, will be removed")
        os.remove(results_path)

    for result in results:
        result.save_txt(results_path)

    with open(results_path, "r+") as file:
        first_line = file.readline().strip().split()
        first_line[0] = str(label_id)
        file.seek(0)
        file.write(" ".join(first_line))
        file.truncate()


def label_dataset():
    """Summary or Description of the Function

    Parameters:
    argument1 (int): Description of arg1

    Returns:
    int:Returning value

    """
    for dataset_dir in glob.glob(f"{DATASET_DIR}/*"):
        type = os.path.basename(dataset_dir)
        labels_result_dir = f"{LABELS_DIR}/{type}"
        images_result_dir = f"{IMAGES_DIR}/{type}"

        if os.path.isdir(dataset_dir) and os.path.exists(labels_result_dir):

            for image_dir in glob.glob(f"{dataset_dir}/*"):
                class_name = os.path.basename(image_dir)
                label_id = CLASSES().get(class_name)

                for image_path in glob.glob(f"{image_dir}/*"):
                    if valid_ultralytics_image_type(image_path):
                        # Copy file
                        shutil.copy(image_path, images_result_dir)
                        label_frame(image_path, label_id, labels_result_dir)


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
