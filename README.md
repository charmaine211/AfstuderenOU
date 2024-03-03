# Driver Gaze Detection

## Collect custom dataset

## Train YoloV8

### File management

Efficient file management is essential for streamlining the training process with YoloV8 on Google Colab. Below are detailed instructions on how to structure your file system effectively:

#### Structure file system YoloV8

```
root
    - training
    - dataset
        - train
            - class_1
            - class_2
            - …
            - class_n
        - val
            - class_1
            - class_2
            - …
            - class_n
```

Here's what each directory contains:

- `root`: This directory serves as the main folder for your project and can be named according to your preference.
- `training`: Within this directory, you'll find any files or data related to training tasks. Its name can also be customised.
- `dataset`: Here, you'll organise your training and validation datasets. You can name this directory as you see fit.
  - `train`: This folder contains subdirectories for each class in your training dataset. The name "train" is mandatory for training purposes.
  - `val`: Similar to the train directory, this folder houses validation dataset subdirectories. The name "val" is required for validation purposes.
    - `class_...`: Each subdirectory corresponds to a specific classification class (e.g., class_1, class_2, etc.), containing the dataset related to that class.

To start, we'll create a root file named driver_gaze_direction and add the following structures:

```
.../driver_gaze_direction/dataset/train
.../driver_gaze_direction/dataset/val
.../driver_gaze_direction/training_results
```

#### Utilizing Shared Drive

If you're working with a shared drive, follow these steps to ensure smooth collaboration and access to your files in Google Colab:

1. **Access Shared Drive**: Open the "Share With Me" section in your Google Drive.
2. **Create Shortcut**: Right-click on the desired folder or file, then select "Add shortcut."
3. **Select Path**: Choose the appropriate location in your 'My Drive' to add the shortcut.

By creating shortcuts, you can seamlessly access the required files or folders within Google Colab for efficient training.

### Train model

To train your model effectively in Google Colab, follow these steps:

1. Mount Google Drive to access your files:

```python
from google.colab import drive
drive.mount('/content/drive')
```

2. Define the directory paths, epochs, batchsizes and data size for your training data and results:

```python
DATA_DIR = '.../driver_gaze_direction/dataset'
RESULTS_DIR = '.../driver_gaze_direction/training_results'
EPOCHS_LIST = [25, 50, 100, 125, 150]
BATCH_SIZES = [120, 180, 240, 300, 360]
DATA_SIZE=64
```

3. Install the necessary and import the dependency:

```python
!pip install ultralytics

from ultralytics import YOLO
```

4. Train your models with different batch sizes and epochs:

```python
# Load a model
model = YOLO('yolov8n-cls.pt')

# Train model
for batch_size in BATCH_SIZE:
    for epochs in EPOCHS_LIST:
        results = model.train(data=DATA_DIR, epochs=epochs, imgsz=data_size, batch=batch_size)
```

Provide the following values to the model.train() function:

- `data`: Specifies the directory where your training data is located.
- `batch`: Sets the batch size for training, indicating how many images are processed before updating the model's parameters.
- `epochs`: Determines the number of training epochs, representing the number of times the entire training dataset is passed through the neural network.
- `imgsz`: Sets the input image size for training. Larger image sizes capture more details but require more resources, while smaller sizes may train faster but sacrifice detail.
- `val`: Enables validation during training to periodically evaluate model performance on a separate dataset. Default value is True.
- `project`: Name of the project directory where training outputs are saved. Allows for organized storage of different experiments. Default value is None.
- `plots`: Generates and saves plots of training and validation metrics, as well as prediction examples, providing visual insights into model performance and learning progression. Default is False.

5. Transfer trained model and analyses files from Google Colab to Drive for further analysis:

```python
!scp -r /content/runs RESULTS_DIR
```

By following these steps, you can effectively train your YOLOv8 model in Google Colab and manage your training data and results efficiently.

### Analyse model

#### Metrics

Once your models have been trained, all the results will be stored in the RESULTS_DIR. If you've followed our file naming convention, this directory will be located at '.../driver_gaze_direction/training_results' on your Google Drive.

Depending on the number of models you've trained, navigate to the corresponding 'runs/train' directory for the desired training data.

Inside the 'runs/train' directory, you'll find several files and a directory called 'weights'. Here's what each file contains:

- `args.yaml`: This file contains the configuration settings used during the training process. You can refer to it if you want to train a new model with different parameters.
- `results.csv`: This file provides information for each epoch, such as the training loss, validation accuracy, and validation loss.
- `results.png`: This file includes plots of the loss and accuracy against the number of epochs.
- `confusion_matrix.png` and `confusion_matrix_normalized.png`: These files can be used to calculate the accuracy, recall, and precision of the model by providing the counts of true/false positives (TP and FP) and true/false negatives (TN and FN)

  - _Precision_: TP/(TP + FP).
    Indicates how often the model correctly predicts the target class.

  - _Accuracy_ : (TP + TN)/(TP + FN + TN + FP).
    This metric shows the overall correctness of a classification ML model. Note that accuracy may not be suitable for imbalanced datasets.

  - _Recall_: TP/(TP + FN).
    It assesses whether the model can identify all instances of the target class.

To analyze the data effectively, observe that the training loss decreases over time while the accuracy of the validation set increases. These trends indicate the model's performance and can help determine its effectiveness.

- `.../weights`: The directory where your model is saved.
  - `best.pt`: Model that is the result of the _best_ epoch of training process.
  - `last.pt`: Model that is the result of the _last_ epoch of training process.

Choosing between the last and the best-trained model depends on your specific requirements and objectives.

### Predict with Model

##### Set up local computer

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

##### Use trained model

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
model = YOLO(MODEL_DIR)

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
