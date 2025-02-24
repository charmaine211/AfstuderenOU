import React, { useState } from 'react';
import { Typography, CircularProgress, Stack } from '@mui/material';

import { labelDatasetOD } from '../../common/api/collectDataset';

import ParameterWindow from '../molecules/ParameterWindow';
import DirectoryInputField from '../atoms/DirectoryInputfield';
import LabelButton from "../atoms/LabelButton";

function LabelParameterWindow() {
    
    // STATES
    const [dataDirectory, setDataDirectory] = useState("");
    const [labelsDirectory, setLabelsDirectory] = useState("");
    const [imagesDirectory, setImagesDirectory] = useState("");
    const [error, setError] = useState("");
    const [labelling, setLabelling] = useState(false);

    // FUNCTIONS
    const validateLabelDirectory = (labelDir) => {
        return labelDir.endsWith('labels');
    }

    const validateImagesDirectory = (imageDir) => {
        return imageDir.endsWith('images');
    }

    const validateODDirectory = (imageDir, labelDir) => {
        const baseImageDir = imageDir.substring(0, imageDir.lastIndexOf('/'));
        const baseLabelDir = labelDir.substring(0, labelDir.lastIndexOf('/'));
        
        return baseImageDir === baseLabelDir && validateLabelDirectory(labelDir) && validateImagesDirectory(imageDir);
    
    }

    // HANDLERS
    const handleDataDirectoryChange = (event) => {
        setDataDirectory(event.target.value);
    };

    const handleLabelsDirectoryChange = (event) => {
        setLabelsDirectory(event.target.value);
    };

    const handleImagesDirectoryChange = (event) => {
        setImagesDirectory(event.target.value);
    };

    const handleLabelData =  async () => {
        if (dataDirectory && labelsDirectory && imagesDirectory){
            if(!validateODDirectory(imagesDirectory, labelsDirectory)) {
                setError("The 'images' and 'labels' directories must be in the same parent directory, with the images in the '/images' map and the labels in the '/labels' map.");

            } else {
                setLabelling(true);
                try {
                    setError("");
                    const result = await labelDatasetOD(dataDirectory, labelsDirectory, imagesDirectory);
                    console.log(result);
                } catch (error) {
                    setError(`Something went wrong on the server: ${error}`);
                } finally{
                    setLabelling(false);
                }
            }
        } else {
            setError("Please fill in all directories");
        }
    };

    return (
        <ParameterWindow>
            <Typography variant="h6">
                Please, provide the following parameters to automatically relabelled your dataset.
            </Typography>
            {error && (
                <Typography variant="body1" style={{ color: "red", padding: 0, margin: 0 }}>
                    {error}
                </Typography>
            )}
            {!labelling && (<><DirectoryInputField
                onChange={handleDataDirectoryChange}
                setPath={setDataDirectory}
                value={dataDirectory}
                label="Data path"
                hasInfo
                info="Path to the root directory of the original dataset."
                ariaLabel="Data path"
                isRequired /><DirectoryInputField
                    onChange={handleLabelsDirectoryChange}
                    setPath={setLabelsDirectory}
                    value={labelsDirectory}
                    label="Labels path"
                    ariaLabel="Labels path"
                    hasInfo
                    info="Directory to save label result text files."
                    isRequired /><DirectoryInputField
                    onChange={handleImagesDirectoryChange}
                    setPath={setImagesDirectory}
                    value={imagesDirectory}
                    label="Images path"
                    ariaLabel="Images path"
                    hasInfo
                    info="Directory to save the copied images."
                    isRequired /></>)}
            {labelling ? 
                <Stack style={{
                    display: "flex",
                    justifyContent: "center",
                    
                }}>
                    <Typography>Labelling images. This may take a while. Please don't close the window...</Typography>
                    <CircularProgress />
                </Stack> : 
                <LabelButton onClick={handleLabelData}/>}
        </ParameterWindow>
    );
}

export default LabelParameterWindow;
