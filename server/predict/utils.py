# Utility functions specific for module
from ultralytics import YOLO
import cv2
from pathlib import Path
import os
from globals import YOLO_IMAGE_EXTENTIONS, YOLO_VIDEO_EXTENTIONS

def valid_ultralytics_image_type(av_path):
    ext = os.path.splitext(av_path)[1]
    return YOLO_IMAGE_EXTENTIONS().count(ext) > 0 or YOLO_VIDEO_EXTENTIONS().count(ext) > 0

def is_video(av_path):
    ext = os.path.splitext(av_path)[1]
    return YOLO_VIDEO_EXTENTIONS().count(ext) > 0

def save_annotated_image(av_path, result):
    """Save the annotated image with predictions overlayed in the same directory as the av_path

    Parameters:
    av_path (string): Path to an image file
    result: Result for image
    """
    original_dir = os.path.dirname(av_path)
    original_name = Path(av_path).stem
    prediction_filename = os.path.join(original_dir, f"{original_name}-prediction.png")

    result.save(prediction_filename)

def save_annotated_video(av_path, results):
    """Save the annotated video with predictions overlayed in the same directory as the av_path

    Parameters:
    av_path (string): Path to an audiovisual file
    results: List of results for each frame in the video
    """
    original_dir = os.path.dirname(av_path)
    original_name = Path(av_path).stem
    prediction_filename = os.path.join(original_dir, f"{original_name}-prediction.mp4")

    cap = cv2.VideoCapture(av_path)

    fps = int(cap.get(cv2.CAP_PROP_FPS))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(prediction_filename, fourcc, fps, (width, height))

    while cap.isOpened():
        success, frame = cap.read()

        if success:

            for result in results:
                annotated_frame = result.plot()

                out.write(annotated_frame)

            # Break the loop if 'q' is pressed
            if cv2.waitKey(1) & 0xFF == ord("q"):
                break
        else:
            break

    cap.release()
    out.release()
    cv2.destroyAllWindows()

def show_annotated_video(av_path, results):
    """Show the annotated video with predictions overlayed in the same directory as the av_path

    Parameters:
    av_path (string): Path to an audiovisual file
    results: List of results for each frame in the video
    """
    cap = cv2.VideoCapture(av_path)

    while cap.isOpened():
        success, frame = cap.read()

        if success:
            for result in results:
                annotated_frame = result.plot()

                cv2.imshow("YOLOv8 Inference", annotated_frame)

                if cv2.waitKey(1) & 0xFF == ord("q"):
                    break
        else:
            break

    cap.release()
    cv2.destroyAllWindows()

def predict_image_classification(model_path, av_path):
    """Predict classification of AV file with provided classify model

    Parameters:
    model_path (string): Path to a .pt image classification model
    av_path (string): Path to an audiovisual file

    Returns:
    dict: In the following form: {0: {class_0: probability, ..., class_n: probability}, ..., n: {class_0: probability, ..., class_n: probability}}

    """
    model = YOLO(model_path)
    results = model(av_path, stream=True, save=is_video(av_path))

    predictions = {}
    frame = 0

    if is_video(av_path):
        print("video")
        # save_annotated_video(av_path, results)

    for result in results:
        prediction = {}
        class_index = 0

        if not is_video(av_path):
            save_annotated_image(av_path, result)
            result.show()

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
    dict: In the following form: {0: {class_0: xywhnc, ..., class_n: xywhnc}, ..., n: {class_0: xywhnc, ..., class_n: xywhnc}}

    """
    model = YOLO(model_path)
    results = model(av_path, stream=True, save=is_video(av_path))
    print("Model successfully loaded")

    predictions = {}
    frame = 0
    
    if is_video(av_path):
        print("video")
        # save_annotated_video(av_path, results)


    for result in results:
        print("Result found")
        prediction = {}
        class_index = 0
        
        if not is_video(av_path):
            print("image")
            save_annotated_image(av_path, result)
            result.show()

        for box in result.boxes:
            print("Box found")
            bbox = box.xywhn.tolist()
            confidence = box.conf.item()
            print(f"{result.names[class_index]}: {bbox[0] + [confidence]}\n")
            prediction[result.names[class_index]] = [bbox[0] + [confidence]]
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
