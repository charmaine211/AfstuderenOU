# Driver Gaze Detection

## Collect custom dataset

## Train YoloV8

### File management

Efficient file management is essential for streamlining the training process with YoloV8 on Google Colab. Below are detailed instructions on how to structure your file system effectively:

#### Structure file system YoloV8

```
root
    - classification
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
- `classification`: Within this directory, you'll find any files or data related to classification tasks. Its name can also be customized.
- `dataset`: Here, you'll organize your training and validation datasets. You can name this directory as you see fit.
  - `train`: This folder contains subdirectories for each class in your training dataset. The name "train" is mandatory for training purposes.
  - `val`: Similar to the train directory, this folder houses validation dataset subdirectories. The name "val" is required for validation purposes.
  - `class_...`: Each subdirectory corresponds to a specific classification class (e.g., class_1, class_2, etc.), containing the dataset related to that class.

To start, we'll create a root file named driver_gaze_direction and add the following structures:

```
.../driver_gaze_direction/dataset
.../driver_gaze_direction/classification
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
# -*- coding: utf-8 -*-
"""Mount the Google Drive"""

from google.colab import drive

drive.mount('/content/drive')

```

2. Define the directory paths, epochs, batchsizes and data size for your training data and results:

```python
DATA_DIR = '.../driver_gaze_direction/dataset'
RESULTS_DIR = '.../driver_gaze_direction/classification'
EPOCHS_LIST = [25, 50, 100, 125, 150]
BATCH_SIZE = [120, 180, 240, 300, 360]
DATA_SIZE = 64
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

# Use model
for batch_size in BATCH_SIZE:
    for epochs in EPOCHS_LIST
        results = model.train(data=DATA_DIR, epochs=epochs, imgsz=data_size, batch=batch_size)
```

Provide the following values to the model.train() function:

- `data`: Specifies the directory where your training data is located.
- `batch`: Sets the batch size for training, indicating how many images are processed before updating the model's parameters.
- `epochs`: Determines the number of training epochs, representing the number of times the entire training dataset is passed through the neural network.
- `imgsz`: Sets the input image size for training. Larger image sizes capture more details but require more resources, while smaller sizes may train faster but sacrifice detail.
- `val`: Enables validation during training to periodically evaluate model performance on a separate dataset. Default value is True

5. Transfer weights and other files from Google Colab to Drive for further analysis:

```python
!scp -r /content/runs RESULTS_DIR
```

By following these steps, you can effectively train your YOLOv8 model in Google Colab and manage your training data and results efficiently.

### Analyse model
