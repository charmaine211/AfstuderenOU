# Utility functions specific for module
from ultralytics import YOLO
import os
from globals import YOLO_IMAGE_EXTENTIONS, YOLO_VIDEO_EXTENTIONS

def valid_ultralytics_image_type(av_path):
    ext = os.path.splitext(av_path)[1]
    return YOLO_IMAGE_EXTENTIONS().count(ext) > 0 or YOLO_VIDEO_EXTENTIONS().count(ext) > 0

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


def predict(path_model, path_av_files):

    print(f"Predict ontvangen: {path_model} \n Files: {path_av_files}")

    results = []

    if valid_ultralytics_image_type(path_av_files):
        for av_file in path_av_files:
            results.append(predict_image_classification(path_model, av_file))
    
    return results
