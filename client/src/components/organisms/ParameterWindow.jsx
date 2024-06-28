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
    project = f"image_classicification--epochs_{epochs}-batchsize_{batch_size}"

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
                        hasInfo 
                        onChange={handleDataDirectoryChange}
                        defaultValue={`/content/drive/MyDrive`}
                        value={dataDirectory} 
                        label="Data Directory" 
                        ariaLabel="Data Directory" 
                    />
                    <MultiSelect 
                        title="Epochs" 
                        options={epochs} 
                        hasInfo 
                        setSelected={setSelectedEpochs} 
                        ariaLabel="Epochs" 
                    />
                    <MultiSelect 
                        title="Batch size" 
                        options={batchSizes} 
                        hasInfo 
                        setSelected={setSelectedBatchSizes} 
                        ariaLabel="Batch size" 
                    />
                    <InputField 
                        hasInfo 
                        onChange={handleSelectedDataSizeChange} 
                        defaultValue={dataSize} 
                        value={selectedDataSize} 
                        label="Data Size" 
                        ariaLabel="Data Size" 
                        type="number"
                    />
                    <DownloadButton onClick={handleDownloadCode}/>
                </Stack>
            </Paper>
        </Box>
    );
}

export default ParameterWindow;
