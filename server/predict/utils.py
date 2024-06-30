# Utility functions specific for module
from ultralytics import YOLO
import os
from globals import YOLO_IMAGE_EXTENTIONS, YOLO_VIDEO_EXTENTIONS

def valid_ultralytics_image_type(av_path):
    ext = os.path.splitext(av_path)[1]
    return YOLO_IMAGE_EXTENTIONS().count(ext) > 0 or YOLO_VIDEO_EXTENTIONS().count(ext) > 0

def predict_image_classification(model, av_file):
    """Predict classification of AV file with provided model

    Parameters:
    model (string): Path to a .pt model
    av_file ([]string): Paths to an audiovisual file

    Returns:
    dict: In the following form: {0: {class_0: probability, ..., class_n: probability}, ..., n: {class_0: probability, ..., class_n: probability}}

    """
    model = YOLO(model)
    results = model(av_file)

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

    for av_path in av_paths:
        if valid_ultralytics_image_type(av_path):
            results[av_path] = predict_image_classification(model_path, av_path)
    
    return results
