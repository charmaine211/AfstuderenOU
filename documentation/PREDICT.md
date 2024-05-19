# Predict with Model

## Set up local computer

1. Download the desired model to your local computer.

2. Create a Virtual Environment and install the 'requirements.txt' file listing all dependencies.

```bash
# Create a virtual environment in the desired directory
python -m venv venv

# Activate the virtual environment
# Windows
venv\Scripts\activate
# macOS and Linux
source venv/bin/activate

# Install requirements in Virtual Environment
pip install -r requirements.txt
```

## Use trained model

1. Import the necessary libraries:

```python
import numpy as np
import glob
from pathlib import Path
from ultralytics import YOLO
```

2. Set the paths for the model and the directory containing the images and videos to predict:

```python
MODEL_PATH = '.../weights/last.pt'
IMAGE_DIR = '.../images'
VIDEO_DIR = '.../videos'
```

3. Run the following code to predict the contents of the images:

```python
model = YOLO(MODEL_PATH)

for image_path in glob.glob(f"{IMAGE_DIR}/*"):

  results = model(image_path)

  names_dict = results[0].names
  probs = results[0].probs.toList()

  if names_dict is not None:
    classification = names_dict[np.argmax(probs)]
    print(f"Image {image_path} has classification {classification}")

for video_path in glob.glob(f"{VIDEO_DIR}/*"):

  results = model(video_path, stream=True)
  print(results)
```

## Results object Ultralytics

A class for storing and manipulating inference results.

Attributes:

- **orig_img (numpy.ndarray)**: Original image as a numpy array.
- **orig_shape (tuple)**: Original image shape in (height, width) format.
- **boxes (Boxes, optional)**: Object containing detection bounding boxes.
- **masks (Masks, optional)**: Object containing detection masks.
- **probs (Probs, optional)**: Object containing class probabilities for classification tasks.
- **keypoints (Keypoints, optional)**: Object containing detected keypoints for each object.
- **speed (dict)**: Dictionary of preprocess, inference, and postprocess speeds (ms/image).
- **names (dict)**: Dictionary of class names.
- **path (str)**: Path to the image file.

Methods:

- **update(boxes=None, masks=None, probs=None, obb=None)**: Updates object attributes with new detection results.
- **cpu()**: Returns a copy of the Results object with all tensors on CPU memory.
- **numpy()**: Returns a copy of the Results object with all tensors as numpy arrays.
- **cuda()**: Returns a copy of the Results object with all tensors on GPU memory.
- **to(\*args, \*\*kwargs)**: Returns a copy of the Results object with tensors on a specified device and dtype.
- **new()**: Returns a new Results object with the same image, path, and names.
- **plot(...)**: Plots detection results on an input image, returning an annotated image.
- **show()**: Show annotated results to screen.
- **save(filename)**: Save annotated results to file.
- **verbose()**: Returns a log string for each task, detailing detections and classifications.
- **save_txt(txt_file, save_conf=False)**: Saves detection results to a text file.
- **save_crop(save_dir, file_name=Path("im.jpg"))**: Saves cropped detection images.
- **tojson(normalize=False)**: Converts detection results to JSON format.
