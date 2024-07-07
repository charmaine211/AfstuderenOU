# Utility functions specific for module
from ultralytics import YOLO
import os
from globals import YOLO_IMAGE_EXTENTIONS, YOLO_VIDEO_EXTENTIONS

def valid_ultralytics_image_type(av_path):
    ext = os.path.splitext(av_path)[1]
    return YOLO_IMAGE_EXTENTIONS().count(ext) > 0 or YOLO_VIDEO_EXTENTIONS().count(ext) > 0

def predict_image_classification(model_path, av_path):
    """Predict classification of AV file with provided classify model

    Parameters:
    model_path (string): Path to a .pt image classification model
    av_path (string): Path to an audiovisual file

    Returns:
    dict: In the following form: {0: {class_0: probability, ..., class_n: probability}, ..., n: {class_0: probability, ..., class_n: probability}}

    """
    model = YOLO(model_path)
    results = model(av_path)

    predictions = {}
    frame = 0

    for result in results:
        prediction = {}
        class_index = 0

        for prob in result.probs:
            prediction[result.names[class_index]] = prob.data.item()
            class_index += 1

        predictions[frame] = prediction
        frame += 1

    return predictions

def predict_object_detection(model_path, av_path):
    """Predict bounding box of AV file with provided detect model

    Parameters:
    model_path (string): Path to a .pt object detection model
    av_path (string): Path to an audiovisual file

    Returns:
    dict: In the following form: {0: {class_0: probability, ..., class_n: probability}, ..., n: {class_0: probability, ..., class_n: probability}}

    """
    model = YOLO(model_path)
    results = model(av_path)
    print("Model succesfully oploaded")

    predictions = {}
    frame = 0

    for result in results:
        print("Result found")
        prediction = {}
        class_index = 0

        for box in result.boxes:
            print("Box found")
            print(f"{result.names[class_index]}:{box.xywhn.tolist()}\n")
            prediction[result.names[class_index]] = box.xywhn.tolist()
            class_index += 1

        predictions[frame] = prediction
        frame += 1

    return predictions

def predict(model_path, av_paths):
    """Predict AV files with provided model

    Parameters:
    model (string): Path to a .pt model
    av_file ([]string): A list with paths to av files

    Returns:
    dict: In the following form: {av_path_0: {0: {class_0: probability, ..., class_n: probability}, ..., n: {class_0: probability, ..., class_n: probability}}, .., av_path_n {...}}

    """
    print(f"Prediction received: {model_path} \n Files: {av_paths}")

    results = {}

    task = YOLO(model_path).task
    for av_path in av_paths:
        if valid_ultralytics_image_type(av_path):
            if task == "classify":
                results[av_path] = predict_image_classification(model_path, av_path)
            elif task == "detect":
                results[av_path] = predict_object_detection(model_path, av_path)
    return results
