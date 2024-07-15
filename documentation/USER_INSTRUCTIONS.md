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

To train a model the user needs labeled images according to a specific filestructure. This structure is different for each task.

### Image Classification<a name="ic-filestructure"></a>

You can label an image by placing it in a folder with the right classname. The following image shows the file structure:

- <span style="color:#74BCD2">root</span>: This directory serves as the main folder for your project and can be named according to your preference.
- <span style="color:#FA873F">training results</span>: Within this directory, we'll place any files or data related to training results. Its name can also be customised.
- <span style="color:#FA873F">dataset</span>: Here, you'll organise your training, testing and validation datasets. You can name this directory as you see fit.
- <span style="color:#EE577E">train</span>: This folder contains subdirectories for each class in your training dataset. The name "train" is mandatory for training purposes.
- <span style="color:#EE577E">val</span>: Similar to the train directory, this folder houses validation dataset subdirectories. The name "val" is required for validation 
- <span style="color:#EE577E">test</span>: This directory is added to document the final model results. It follows the same structure as the training and validation sets.
- class_...: Each subdirectory corresponds to a specific class (e.g., class_1, class_2, etc.), containing the related dataset purposes.

![Image Classification file structure](/assets/user_instructions/ImageClassificationFileTree.png){:style="height:200px;"}

### Object detection<a name="od-filestructure"></a>

Images need to have corresponding label files with the normalize xywh (x-coordinate, y-coordinate, width, height) values of the bounding boxes. The following image shows the filestructure:

- <span style="color:#74BCD2">root</span>: This directory serves as the main folder for your project and can be named according to your preference.
- <span style="color:#FA873F">training results</span>: Within this directory, we'll place any files or data related to training results. Its name can also be customised.
- <span style="color:#FA873F">dataset</span>: Here, you'll organise your training, testing and validation datasets. You can name this directory as you see fit.
- <span style="color:#3CD19D">images</span>: Here, you'll organise your training, testing and validation images. The name "images" is mandatory.
- <span style="color:#EE577E">train</span>: This folder contains the training images. Each image should have a corresponding label file in the "labels/train" directory.
- <span style="color:#EE577E">val</span>: Similarly, this folder contains the validation images, each with its corresponding label file in the "labels/val" directory.
- <span style="color:#EE577E">test</span>: This directory holds the test images, which are used for final model evaluation.
- <span style="color:#3CD19D">labels</span>: Here, you organize your training, testing, and validation label files corresponding to the images. This directory must be named "labels".
- <span style="color:#EE577E">train</span>:This folder contains the label files for the training images. Each label file should have the same name as its corresponding image file, but with a ".txt" extension.
- <span style="color:#EE577E">val</span>: Similarly, this folder contains the label files for the validation images, following the same naming convention.
- <span style="color:#EE577E">test</span>: This directory is added to document the final model results, following the same naming convention.

![Object Detection file structure](/assets/user_instructions/ObjectDetectionFileTree.png){:height="200px"}

Manually labelling the images will take a lot of work. In the application you can automatically relabel your images. Make sure that you images are in the same filestructure as the Image Classification filestructure. Which means that every image is placed into a file with the corresponding classname. 

![Label window](/assets/user_instructions/Label%20window.png){:height="200px"}

1. Make sure your original data follows the same file structure as the [image classification](#ic-filestructure) standard. Add the path to the `Data path` field; in our example, the added path would be `root/dataset`.
2. Create the file structure to place the labels and images as shown in [object detection](#od-filestructure). Add the path for the labels and images in the `Labels path` field and `Images path` field; in our example, this would be `root/dataset/labels` and `root/dataset/images`.
3. Press `Label` to make copies of the original images. The application will place them in the `images` folder, and place the corresponding labels in the `labels` folder. This may take a while, depending on the amount of images. Please make sure that only the driver is in the images.

## Train model <a name="train"></a>
### Image Classification

### Object detection

## Predict <a name="predict"></a>



