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
