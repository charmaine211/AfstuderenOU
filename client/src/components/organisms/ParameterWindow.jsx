import React, { useState, useEffect } from 'react';
import { Paper, Box, Stack, Typography } from '@mui/material';

import { createNotebook } from "../../common/utils"

import InputField from '../atoms/InputField';
import MultiSelect from '../atoms/MultiSelect';
import DownloadButton from '../atoms/DownloadButton';

function ParameterWindow() {

    // CONSTANTS
    const epochs = ["25", "50", "100", "125", "150"];
    const batchSizes = ["auto", "120", "180", "240", "300", "360"];
    const dataSize = "640";

    // STATES
    const [dataDirectory, setDataDirectory] = useState("");
    const [projectTitle, setProjectTitle] = useState("image_classicification--epochs_{epochs}-batchsize_{batch_size}");
    const [selectedDataSize, setSelectedDataSize] = useState(dataSize);
    const [selectedEpochs, setSelectedEpochs] = useState([]);
    const [selectedBatchSizes, setSelectedBatchSizes] = useState([]);
    const [code, setCode] = useState("")

    // EFFECTS
    useEffect(() => {
        setCode(
`# CONSTANTS
DATA_DIR = ${dataDirectory}
EPOCHS_LIST = ${JSON.stringify(selectedEpochs)}
BATCH_SIZES = ${JSON.stringify(selectedBatchSizes)}
DATA_SIZE= ${selectedDataSize}

#IMPORT ULTRALYTICS
!pip install ultralytics

from ultralytics import YOLO

# TRAIN MODEL
for batch_size in BATCH_SIZES:
    for epochs in EPOCHS_LIST:

    # Name project
    project = f"${projectTitle}"

    # Load a model
    model = YOLO('yolov8n-cls.pt')

    # Train model
    results = model.train(
        data=DATA_DIR,
        epochs=epochs,
        imgsz=DATA_SIZE,
        # batch=batch_size,
        project=project,
        )`);
    }, [dataDirectory, selectedEpochs, selectedBatchSizes]);

    
    // HANDLERS
    const handleDataDirectoryChange = (event) => {
        setDataDirectory(event.target.value)
    }

    const handleProjectTitleChange = (event) => {
        setProjectTitle(event.target.value)
    }

    const handleSelectedDataSizeChange = (event) => {
        setSelectedDataSize(event.target.value)
    }

    const handleDownloadCode = () => {
        createNotebook(code, "image_classification")
    } 

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                marginBottom:"10em",
            }}
        >
            <Paper 
                variant="outlined" 
                sx={{
                    padding: 10,
                    border: '2px solid black',
                    borderRadius: 5,
                    boxShadow: 4,
                }}
            >
                <Typography variant="h6" >
                    Adjust the following parameters for the Notebook
                </Typography>
                <Stack spacing={3}             
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        marginTop: 5,
                    }}>
                    <InputField 
                        onChange={handleDataDirectoryChange}
                        defaultValue={`/content/drive/MyDrive`}
                        value={dataDirectory} 
                        label="Data Directory" 
                        hasInfo 
                        info="Specifies the directory where your training data is located."
                        ariaLabel="Data Directory" 
                    />
                    <InputField 
                        onChange={handleProjectTitleChange} 
                        defaultValue={projectTitle} 
                        value={projectTitle} 
                        label="Project Title" 
                        ariaLabel="Project Title" 
                        hasInfo 
                        info="The title of the file containing the training results"
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
                        info=" Sets the batch size for training, indicating how many images are processed before updating the model's parameters."
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
                    <DownloadButton onClick={handleDownloadCode}/>
                </Stack>
            </Paper>
        </Box>
    );
}

export default ParameterWindow;
