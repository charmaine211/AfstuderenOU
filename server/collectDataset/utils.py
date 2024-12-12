# Utility functions specific for module

import os
import shutil
import glob
from ultralytics import YOLO
from globals import CLASSES, YOLO_IMAGE_EXTENTIONS, YOLO_VIDEO_EXTENTIONS

FACE_MODEL_PATH = "../server/models/yolov8n-face.pt"


def valid_ultralytics_image_type(av_path):
    ext = os.path.splitext(av_path)[1]
    return (
        YOLO_IMAGE_EXTENTIONS().count(ext) > 0 or YOLO_VIDEO_EXTENTIONS().count(ext) > 0
    )


def __label_frame(image_path, label_id, label_result_dir, images_result_dir):
    """
    Labels a single image frame and saves the results.

    Parameters:
    image_path (str): Path to the input image.
    label_id (int): ID of the label to assign to the detected objects.
    label_result_dir (str): Directory to save the label result text file.
    images_result_dir (str): Directory to save the copied image.

    Returns:
    None
    """
    txt_file = os.path.basename(image_path).split(".")[0]
    results_path = os.path.join(label_result_dir, f"{txt_file}.txt")

    if not os.path.exists(results_path):
        # Copy file
        shutil.copy(image_path, images_result_dir)

        # Create label
        model = YOLO(FACE_MODEL_PATH)
        results = model(image_path)

        for result in results:
            result.save_txt(results_path)

        with open(results_path, "r+") as file:
            first_line = file.readline().strip().split()
            first_line[0] = str(label_id)
            file.seek(0)
            file.truncate()
            file.write(" ".join(first_line))
    else:
        print("Skip file")


def label_dataset(dataset_dir, labels_dir, images_dir):
    """
    Labels a dataset of images organized in directories by class.

    Parameters:
    dataset_dir (str): Path to the root directory of the dataset.
    labels_dir (str): Directory to save label result text files.
    images_dir (str): Directory to save the copied images.

    Returns:
    bool: Succes if the dataset was successfully processed and labeled, False otherwise.
    """
    for type_dir in glob.glob(os.path.join(dataset_dir, "*")):
        success = "Failed"
        print(f"Type: {type_dir}")
        type = os.path.basename(type_dir)
        labels_result_dir = os.path.join(labels_dir, type)
        images_result_dir = os.path.join(images_dir, type)

        if os.path.isdir(images_result_dir) and os.path.exists(labels_result_dir):

            print("Labels and images directories exist")

            for image_dir in glob.glob(f"{type_dir}/*"):
                print(f"Classname: {image_dir}")
                class_name = os.path.basename(image_dir)
                label_id = CLASSES().get(class_name)

                for image_path in glob.glob(f"{image_dir}/*"):
                    if valid_ultralytics_image_type(image_path):
                        # Label file
                        __label_frame(
                            image_path, label_id, labels_result_dir, images_result_dir
                        )
            success = "Success"

        return success
