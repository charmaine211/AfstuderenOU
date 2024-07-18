# Automatic Driver Gaze Annotation

Driver Gaze Annotation is a desktop app that helps the user with [labelling](#label) of a dataset with images of a driver, generate a Notebook and YAML document to [train](#train) a YOLO model and [predict](#predict) the class of an image or video showing a driver with a trained model. 

![Homescreen](/assets/user_instructions/Homescreen.png)

We've selected 2 tasks to recognize a driver: Image Classification and Object Detection. 

**Image classification**

Image classification is a very simple task and involves the model classifying the entire image into one of a set of classes. The output is a class label and a confidence score. 

![Image classification](/assets/user_instructions/IC%20-%20schema.png)

**Object detection**

Object detection is a task that involves identifying the location and class of objects in an image or video stream. The output of an object detector is a set of bounding boxes that enclose the objects in the image, along with the location of the boxes, class labels and confidence scores for each box.

![Object detection](/assets/user_instructions/OD%20-%20schema.png)

## Label dataset <a name="label"></a>

To train a model, the user needs labeled images according to a specific file structure. This structure differs for each task.

### Image Classification <a name="ic-filestructure"></a>

You can label an image by placing it in a folder with the correct class name. The following image shows the file structure:

- <span style="color:#74BCD2">root</span>: This directory serves as the main folder for your project and can be named according to your preference.
- <span style="color:#FA873F">training results</span>: Within this directory, we'll place any files or data related to training results. Its name can also be customized.
- <span style="color:#FA873F">dataset</span>: Here, you'll organize your training, testing, and validation datasets. You can name this directory as you see fit.
- <span style="color:#EE577E">train</span>: This folder contains subdirectories for each class in your training dataset. The name "train" is mandatory for training purposes.
- <span style="color:#EE577E">val</span>: Similar to the train directory, this folder houses validation dataset subdirectories. The name "val" is required for validation.
- <span style="color:#EE577E">test</span>: This directory is added to document the final model results. It follows the same structure as the training and validation sets.
- class_...: Each subdirectory corresponds to a specific class (e.g., class_1, class_2, etc.), containing the related dataset purposes.

<img src="/assets/user_instructions/ImageClassificationFileTree.png" alt="Image Classification file structure" height="350">

### Object Detection <a name="od-filestructure"></a>

Images need to have corresponding label files with the normalized xywh (x-coordinate, y-coordinate, width, height) values of the bounding boxes. The following image shows the file structure:

- <span style="color:#74BCD2">root</span>: This directory serves as the main folder for your project and can be named according to your preference.
- <span style="color:#FA873F">training results</span>: Within this directory, we'll place any files or data related to training results. Its name can also be customized.
- <span style="color:#FA873F">dataset</span>: Here, you'll organize your training, testing, and validation datasets. You can name this directory as you see fit.
- <span style="color:#3CD19D">images</span>: Here, you'll organize your training, testing, and validation images. The name "images" is mandatory.
- <span style="color:#EE577E">train</span>: This folder contains the training images. Each image should have a corresponding label file in the "labels/train" directory.
- <span style="color:#EE577E">val</span>: Similarly, this folder contains the validation images, each with its corresponding label file in the "labels/val" directory.
- <span style="color:#EE577E">test</span>: This directory holds the test images, which are used for final model evaluation.
- <span style="color:#3CD19D">labels</span>: Here, you organize your training, testing, and validation label files corresponding to the images. This directory must be named "labels".
- <span style="color:#EE577E">train</span>: This folder contains the label files for the training images. Each label file should have the same name as its corresponding image file, but with a ".txt" extension.
- <span style="color:#EE577E">val</span>: Similarly, this folder contains the label files for the validation images, following the same naming convention.
- <span style="color:#EE577E">test</span>: This directory is added to document the final model results, following the same naming convention.

<img src="/assets/user_instructions/ObjectDetectionFileTree.png" alt="Object Detection file structure" height="450">

Manually labeling the images will take a lot of work. The application let's you automatically relabel your images. Make sure that your images are in the same file structure as the Image Classification file structure, which means that every image is placed into a folder with the corresponding class name.

<img src="/assets/user_instructions/Label%20window.png" alt="Label window" height="350">

1. Navigate to the `Label data` page. 
2. Make sure your original data follows the same file structure as the [image classification](#ic-filestructure) standard. Add the path to the `Data path` field; in our example, the added path would be `root/dataset`.
3. Create the file structure to place the labels and images as shown in [object detection](#od-filestructure). Add the path for the labels and images in the `Labels path` field and `Images path` field; in our example, this would be `root/dataset/labels` and `root/dataset/images`.
4. Press `Label` to make copies of the original images. The application will place them in the `images` folder, and place the corresponding labels in the `labels` folder. This may take a while, depending on the amount of images. Please make sure that only the driver is in the images.

## Train model <a name="train"></a>

To train an AI model, you need a labeled dataset in the right file structure and a computer with a good graphics card. Our application lets you download the code to train a YOLOv8 or YOLOv9 model. We recommend using [Lightning.AI](https://lightning.ai/) to run the code and train your model.

### Platform to train model

Lightning AI is a platform and framework for building and deploying AI products with generative models.

If you don't have an account, first create an account. After your account has been verified, proceed with the following steps:

1. Create a new studio.
2. Upload your dataset.

### Download code

After you've uploaded your dataset to the location where you want to train your model, follow these steps depending on the task.

#### Image Classification

1. Navigate to the `Train` page and select `Image Classification`.
2. Add the following parameters:
   - Data Directory: The path to your dataset
   - Project Title: The name under which you want to save your training results
   - Epochs: The number of epochs for training
   - Batch Size: The batch size for training
   - Data Size: The size of the dataset

3. Download the Notebook file and upload it to your editor. We're using lightning.ai.
4. Run your application.

#### Object Detection

1. Navigate to the `Train` page and select `Object Detection`.
2. Add the following parameters:
   - Select Model: Choose the YOLO model to use
   - Data Directory: The path to your dataset
   - Yaml Directory: The path to your YAML configuration file
   - Project Title: The name under which you want to save your training results
   - Epochs: The number of epochs for training
   - Batch Size: The batch size for training
   - Data Size: The size of the dataset

3. Download the Notebook and YAML files and upload them to your editor. We're using lightning.ai.
4. Run your application.

## Analyze model

Following the training and validation of the model using various parameters, the most effective model will be selected. This selected model will undergo testing on the designated testing set, where the resulting variables will be documented in the research paper.

### Metrics

Once your models have been trained, all the results will be stored in the `RESULTS_DIR`. If you've followed our file naming convention, this directory will be located at `.../driver_gaze_direction/training_results` on your Google Drive.

Depending on the number of models you've trained, navigate to the corresponding `runs/train` directory for the desired training data.

Inside the `runs/train` directory, you'll find several files and a directory called `weights`. Here's what each file contains:

- `args.yaml`: This file contains the configuration settings used during the training process. You can refer to it if you want to train a new model with different parameters.
- `results.csv`: This file provides information for each epoch, such as the training loss, validation accuracy, and validation loss.
- `results.png`: This file includes plots of the loss and accuracy against the number of epochs.
- `confusion_matrix.png` and `confusion_matrix_normalized.png`: These files can be used to calculate the accuracy, recall, and precision of the model by providing the counts of true/false positives (TP and FP) and true/false negatives (TN and FN).
  - _Precision_: TP / (TP + FP). Indicates how often the model correctly predicts the target class.
  - _Accuracy_: (TP + TN) / (TP + FN + TN + FP). This metric shows the overall correctness of a classification ML model. Note that accuracy may not be suitable for imbalanced datasets.
  - _Recall_: TP / (TP + FN). It assesses whether the model can identify all instances of the target class.

To analyze the data effectively, observe that the training loss decreases over time while the accuracy of the validation set increases. These trends indicate the model's performance and can help determine its effectiveness.

- `.../weights`: The directory where your model is saved.
  - `best.pt`: Model that is the result of the _best_ epoch of the training process.
  - `last.pt`: Model that is the result of the _last_ epoch of the training process.

Choosing between the last and the best-trained model depends on your specific requirements and objectives.

## Predict <a name="predict"></a>



