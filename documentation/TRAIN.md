# Train YoloV8

## File management

Efficient file management is essential for streamlining the training process with YoloV8 on Google Colab. Below are detailed instructions on how to structure your file system effectively:

### Structure file system YoloV8

```
root
    - training_results
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
        - test
            - class_1
            - class_2
            - …
            - class_n
```

Here's what each directory contains:

- `root`: This directory serves as the main folder for your project and can be named according to your preference.
- `training_results`: Within this directory, we'll place any files or data related to training results. Its name can also be customised.
- `dataset`: Here, you'll organise your training and validation datasets. You can name this directory as you see fit.
  - `train`: This folder contains subdirectories for each class in your training dataset. The name "train" is mandatory for training purposes.
  - `val`: Similar to the train directory, this folder houses validation dataset subdirectories. The name "val" is required for validation purposes.
  - `test`: This directory is added to document the final model results. It follows the same structure as the training and validation sets.
    - `class_...`: In image classification tasks, each subdirectory corresponds to a specific class (e.g., class_1, class_2, etc.), containing the related dataset. Note: This is not required for object detection tasks.

_Additional Notes:_

- The dataset distribution follows an 80:10:10 ratio for training, validation, and test sets respectively.
- The structure provided includes a "test" directory for comprehensive testing of the trained YoloV8 model.
- The "class\_..." directories within "train" and "val" represent individual classes for classification tasks. However, for object detection tasks, these directories are not necessary and can be omitted.

To start, we'll create a root file named driver_gaze_direction and add the following structures:

```
.../driver_gaze_direction/dataset/train
.../driver_gaze_direction/dataset/val
.../driver_gaze_direction/dataset/test
.../driver_gaze_direction/training_results
```

### Labeling

#### Image classification

For Ultralytics YOLO classification tasks, the dataset must be organized in a specific split-direcotry structure under the root directory to facilitate proper training, testing, and optional validation processes. This structure includes separate directories for training (train) and testing (test) phases, with an optional directory for validation (val).

Each of these directories should contain one subdirectory for each class in the dataset. The subdirectories are named after the corresponding class and contain all the images for that class. Ensure that each image file is named uniquely and stored in a common format such as JPEG or PNG.

#### Object detection

To annotate images for object detection using YOLOv8 format, follow these steps:

##### 1. Choose an Annotation Tool

Select a suitable annotation tool that supports YOLOv8 label format. We recommend using [CVAT](https://www.cvat.ai/) due to its online accessibility, but you can opt for any labeling tool of your preference.

**Annotating with CVAT**

_1. Create an Account (if necessary)_

If you haven't already, create an account on CVAT.

_2. Create a new project_

- Navigate to `Projects` and click on `Create a new project`.
- Provide a name for your project and define the desired labels.
- Click on `Submit & Open`.

![Create a new project](/assets/readme/CVAT%20-%20create%20project.png)

_3. Create a new task_

- Go to `Tasks` and select `Create a new task`
- Assign a name to your task and choose the project you just created. The labels from your project will be available for annotation in this task.
- Upload all the images related to this task. Note that images can only be uploaded from the same directory.
- Click on `Submit & Open`. Once the files are uploaded, you can proceed to the task.

![Create a new task](/assets/readme/CVAT%20-%20create%20task.png)

_4. Annotate frames_

- Open the task and select the job.

![Open job](/assets/readme/CVAT%20-%20open%20job.png)

- Begin annotating by choosing your preferred annotation method, such as drawing a bounding box around the driver's face. Remember to save your work periodically

![Annotate 1](/assets/readme/CVAT%20-%20start%20annotation.png)

![Annotate 2](/assets/readme/CVAT%20-%20start%20annotation%20-%202.png)

![Annotate 3](/assets/readme/CVAT%20-%20start%20annotation%20-%203.png)

_5. Export the labels_

- After completing the annotation process, navigate to the `Tasks` section. Click on `Actions` and select `Export task dataset`.

![Export labels](/assets/readme/CVAT%20-%20export%20labels.png)

- Choose `YOLO 1.1` as the export format and confirm your selection. The export process will begin, and the file will be downloaded to your system

![Export labels](/assets/readme/CVAT%20-%20export%20labels%20-%202.png)

- Once the download is complete, unzip the downloaded folder. Within the extracted folder, locate the `obj_train_data` directory. Inside this directory, you will find .txt files corresponding to each annotated image.

- Proceed to [step 5](##Add-Dataset) to continue with the next stage.

###### 2. Annotate Objects

Open the chosen annotation tool and import the images from your dataset. Manually annotate each object by drawing bounding boxes around them. Ensure to assign appropriate class labels to each object.

###### 3. Export Annotations

Once all images are annotated, export the annotations in YOLO format. These exported files should be saved in the same directory as the corresponding images, with the same filename but a different extension (e.g., .txt).

###### 4. Verify Annotations

Double-check a few exported annotation files to confirm adherence to the YOLOv8 label format. Ensure that the class labels, coordinates, and sizes are accurately normalized.

<a href="#Add-Dataset"> </a>

###### 5. Add Dataset

Arrange the annotated images and their respective annotation files (.txt) appropriately within your dataset directory (i.e. `train` or `validation`). Ensure that each image is paired with its corresponding label file in the same directory.

#### Utilizing Shared Drive

If you're working with a shared drive, follow these steps to ensure smooth collaboration and access to your files in Google Colab:

1. **Access Shared Drive**: Open the "Share With Me" section in your Google Drive.
2. **Create Shortcut**: Right-click on the desired folder or file, then select "Add shortcut."
3. **Select Path**: Choose the appropriate location in your 'My Drive' to add the shortcut.

By creating shortcuts, you can seamlessly access the required files or folders within Google Colab for efficient training.

## Train model

To train your model effectively in Google Colab, follow these steps:

1. Mount Google Drive to access your files:

```python
from google.colab import drive
drive.mount('/content/drive')
```

2. Before Proceeding: Switching to GPU Runtime

To optimize performance, it's recommended to switch from CPU to GPU runtime.

I. Click on RAM/Disk Icon:

Find and click on the RAM/Disk icon located in the top right corner of the notebook interface.

![Click on Ram/Disk](../assets/readme/select%20GPU%201.png)

II. Select "Change Runtime Type":

After clicking the RAM/Disk icon, a menu will appear. From the menu, select "Change Runtime Type."

![Click on Change Runtime Type](../assets/readme/select%20GPU%202.png)

III. Choose GPU:

In the "Change Runtime Type" window, select "GPU" from the dropdown menu.

![Select GPU](../assets/readme/select%20GPU%203.png)

3. Define the directory paths, epochs, batchsizes and data size for your training data and results:

```python
DATA_DIR = '.../driver_gaze_direction/dataset'
RESULTS_DIR = '.../driver_gaze_direction/training_results'
EPOCHS_LIST = [25, 50, 100, 125, 150]
BATCH_SIZES = [120, 180, 240, 300, 360]
DATA_SIZE=64
```

4. Install the necessary and import the dependency:

```python
!pip install ultralytics

from ultralytics import YOLO
```

5. Train your models with different batch sizes and epochs:

```python
n = 1

for batch_size in BATCH_SIZES:
  for epochs in EPOCHS_LIST:

    # Name project
    project = f"image_classicification-model_{n}-epochs_{epochs}-batchsize_{batch_size}"

    # Load a model
    model = YOLO('yolov8n-cls.pt')

    # Train model
    results = model.train(
      data=DATA_DIR,
      epochs=epochs,
      imgsz=DATA_SIZE,
      batch=batch_size
      project=project
      )

    # Move the results
    DIRECTORY = f"/content/image_classicification-model_{n}-epochs_{epochs}-batchsize_{batch_size}"

    !scp -r DIRECTORY RESULTS_DIR
    n+=1
```

Provide the following values to the model.train() function:

- `data`: Specifies the directory where your training data is located.
- `batch`: Sets the batch size for training, indicating how many images are processed before updating the model's parameters.
- `epochs`: Determines the number of training epochs, representing the number of times the entire training dataset is passed through the neural network.
- `imgsz`: Sets the input image size for training. Larger image sizes capture more details but require more resources, while smaller sizes may train faster but sacrifice detail.
- `val`: Enables validation during training to periodically evaluate model performance on a separate dataset. Default value is True.
- `project`: Name of the project directory where training outputs are saved. Allows for organized storage of different experiments. Default value is None.
- `plots`: Generates and saves plots of training and validation metrics, as well as prediction examples, providing visual insights into model performance and learning progression. Default value is False.

5. Transfer trained model and analyses files from Google Colab to Drive for further analysis:

```python
!scp -r /content/runs RESULTS_DIR
```

By following these steps, you can effectively train your YOLOv8 model in Google Colab and manage your training data and results efficiently.

## Analyse model

Following the training and validation of the model using various parameters, the most effective model will be selected. This selected model will undergo testing on the designated testing set, where the resulting variables will be documented in the research paper.

### Metrics

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
