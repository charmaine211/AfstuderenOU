import React, { useState, useEffect } from 'react';
import {Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { downloadNotebook, downloadYAML } from '../../common/utils/download';

import ParameterWindow from '../molecules/ParameterWindow';
import InputField from '../atoms/InputField';
import MultiSelect from '../atoms/MultiSelect';
import DownloadButton from '../atoms/DownloadButton';
import DropdownField from '../atoms/DropdownField';

function TrainParameterWindow({ isImageClassification, isObjectDetection }) {
    // CONSTANTS
    const epochs = ["25", "50", "100", "125", "150"];
    const batchSizes = ["auto", "120", "180", "240", "300", "360"];
    const dataSize = "640";
    const yolo_v9 = "yolov9c.pt";
    const yolo_v8 = "yolov8n.pt";

    const modelMenuItems = [{
        value:yolo_v9,
        label:yolo_v9 
    },
    {
        value:yolo_v8,
        label:yolo_v8 
    },
]

    // STATES
    const [dataDirectory, setDataDirectory] = useState("/teamspace/studios/this_studio/");
    const [yamlDirectory, setYamlDirectory] = useState("/teamspace/studios/this_studio/");
    const [projectICTitle, setICProjectTitle] = useState("image_classicification-epochs_{epochs}-batchsize_{batch_size}");
    const [projectODTitle, setODProjectTitle] = useState("object_detection-epochs_{epochs}-batchsize_{batch_size}");
    const [selectedDataSize, setSelectedDataSize] = useState(dataSize);
    const [selectedEpochs, setSelectedEpochs] = useState(["25"]);
    const [selectedBatchSizes, setSelectedBatchSizes] = useState(["auto"]);
    const [selectedProjectTitle, setSelectedProjectTitle] = useState(isImageClassification ? projectICTitle : projectODTitle);
    const [icCode, setIcCode] = useState("");
    const [odCode, setOdCode] = useState("");
    const [selectedOdModel, setSelectedOdModel] = useState(yolo_v9);
    const [yamlContent, setYamlContent] = useState("");

    // EFFECTS
    useEffect(() => {
        setIcCode(
`# CONSTANTS
DATA_DIR = '${dataDirectory}'
EPOCHS_LIST = ${JSON.stringify(selectedEpochs)}
BATCH_SIZES = ${JSON.stringify(selectedBatchSizes)}
DATA_SIZE= ${selectedDataSize}

# IMPORT ULTRALYTICS
!pip install ultralytics

from ultralytics import YOLO

# TRAIN MODEL
for batch_size in BATCH_SIZES:
    for epochs in EPOCHS_LIST:

    # Name project
    project = f"${selectedProjectTitle}"

    # Load a model
    model = YOLO('yolov8n-cls.pt')

    # Train model
    results = model.train(
        data=DATA_DIR,
        epochs=epochs,
        imgsz=DATA_SIZE,
        batch=batch_size,
        project=project,
        )`);
    }, [dataDirectory, selectedEpochs, selectedBatchSizes, projectICTitle, selectedDataSize, selectedProjectTitle]);

    useEffect(() => {
        setOdCode(
`# CONSTANTS
DATASET = '${dataDirectory}'
EPOCHS_LIST = ${JSON.stringify(selectedEpochs)}
BATCH_SIZES = ${JSON.stringify(selectedBatchSizes)}
DATA_SIZE= ${selectedDataSize}

# IMPORT ULTRALYTICS
!pip install ultralytics

from ultralytics import YOLO

# LOAD MODEL
model = YOLO(${selectedOdModel})

# TRAIN MODEL
for batch_size in BATCH_SIZES:
    for epochs in EPOCHS_LIST:
        project = f"${selectedProjectTitle}_${selectedOdModel.slice(0, -3)}"
        results = model.train(
            data=DATASET,
            epochs=epochs,
            batch=batch_size,
            imgsz=DATA_SIZE,
            project=project)    
        `);
                }, [dataDirectory, selectedEpochs, selectedBatchSizes, projectODTitle, selectedDataSize, selectedOdModel, selectedProjectTitle]);    

    useEffect(() => {
        setYamlContent(
`path: ${dataDirectory}
train: images/train # train images (relative to 'path')
val: images/val # val images (relative to 'path')
test: images/test # test images (optional)

# Classes
names:
0: shoulder_right
1: shoulder_left
2: right
3: mirror_right
4: mirror_left
5: mirror_interior
6: left
7: forward_right
8: forward_left
9: forward
10: dashboard_straight_down
11: dashboard_down_right`
        );
                }, [dataDirectory]); 

    // HANDLERS
    const handleSelectModel = (event) => {
        setSelectedOdModel(event.target.value);
    }

    const handleDataDirectoryChange = (event) => {
        setDataDirectory(event.target.value);
    };

    const handleYamlDirectoryChange = (event) => {
        setYamlDirectory(event.target.value);
    };

    const handleProjectTitleChange = (event) => {
        setSelectedProjectTitle(event.target.value);
    };

    const handleSelectedDataSizeChange = (event) => {
        setSelectedDataSize(event.target.value);
    };

    const handleDownloadCode = async () => {
        if (isImageClassification){
            downloadNotebook(icCode, "image_classification");
        }
        else if (isObjectDetection ){
            downloadNotebook(odCode, "object_detection");
            await new Promise(r => setTimeout(r, 5000)); // Otherwise only first file will be downloaded
            downloadYAML(yamlContent, "object_detection");
        }
    };

    return (
        <ParameterWindow>
                <Typography variant="h6">
                    Adjust the following parameters for the Notebook
                </Typography>
                {isObjectDetection && <DropdownField title="Select model" onSelect={handleSelectModel} menuItems={modelMenuItems}  hasInfo={true} ariaLabel="Models that can be used" info="Choose the model with which you want to train"/>}
                <InputField 
                    onChange={handleDataDirectoryChange}
                    defaultValue={`/content/drive/MyDrive`}
                    value={dataDirectory} 
                    label="Data Directory" 
                    hasInfo 
                    info="Specifies the directory where your training data is located."
                    ariaLabel="Data Directory" 
                />
                {isObjectDetection && <InputField 
                    onChange={ handleYamlDirectoryChange}
                    defaultValue={`/content/drive/MyDrive`}
                    value={yamlDirectory} 
                    label="Yaml file Directory" 
                    hasInfo 
                    info= "Specifies the directory where your yaml file is located."
                    ariaLabel="Data Directory" 
                />}
                <InputField 
                    onChange={handleProjectTitleChange} 
                    defaultValue={selectedProjectTitle} 
                    value={selectedProjectTitle} 
                    label="Project Title" 
                    ariaLabel="Project Title" 
                    hasInfo 
                    info= "The title of the file containing the training results"
                />
                <MultiSelect 
                    title="Epochs" 
                    options={epochs} 
                    hasInfo 
                    info="Determines the number of training epochs, representing the number of times the entire training dataset is passed through the neural network."
                    setSelected={setSelectedEpochs} 
                    ariaLabel="Epochs" 
                />
                <MultiSelect 
                    title="Batch size" 
                    options={batchSizes} 
                    hasInfo 
                    info="Sets the batch size for training, indicating how many images are processed before updating the model's parameters."
                    setSelected={setSelectedBatchSizes} 
                    ariaLabel="Batch size" 
                />
                <InputField 
                    onChange={handleSelectedDataSizeChange} 
                    defaultValue={dataSize} 
                    value={selectedDataSize} 
                    label="Data Size" 
                    ariaLabel="Data Size" 
                    hasInfo 
                    info="Size of the image used during profiling. Default is 640."
                    type="number"
                />

                <DownloadButton onClick={handleDownloadCode} />
        </ParameterWindow>
    );
}

TrainParameterWindow.propTypes = {
    isImageClassification: PropTypes.bool.isRequired,
    isObjectDetection: PropTypes.bool.isRequired,
}

export default TrainParameterWindow;
