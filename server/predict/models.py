from ultralytics import YOLO


def predict_object_detection_video(model, av_files):

    model = YOLO(model)
    predictions = []

    for av_file in av_files:
        results = model(av_file)
        predictions.append({"file": av_file, "results": results})

    return predictions
