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


def predict(model_path, av_paths):

    print(f"Prediction received: {model_path} \n Files: {av_paths}")

    results = []

    for av_path in av_paths:
        if valid_ultralytics_image_type(av_path):
            results.append(predict_image_classification(model_path, av_path))
    
    return results
