import React, { useState } from 'react';
import { Paper, Box, Stack, Typography } from '@mui/material';
import InputField from '../atoms/InputField';
import MultiSelect from '../atoms/MultiSelect';

function ParameterWindow() {
    // CONSTANTS
    const epochs = ["25", "50", "100", "125", "150"];
    const batchSizes = ["auto", "120", "180", "240", "300", "360"];
    const dataSize = "360";

    // STATES
    const [dataDirectory, setDataDirectory] = useState("");
    const [resultsDirectory, setResultsDirectory] = useState("");
    const [selectedDataSize, setSelectedDataSize] = useState("640");
    const [selectedEpochs, setSelectedEpochs] = useState([]);
    const [selectedBatchSizes, setSelectedBatchSizes] = useState([]);

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
                    padding: 5,
                    border: '2px solid black',
                }}
            >
                <Stack spacing={2}             sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}>
                    <Typography variant="h6">
                        Adjust the following parameters for the Notebook
                    </Typography>
                    <InputField 
                        hasInfo 
                        onChange={(value) => setDataDirectory(value)} 
                        value={dataDirectory} 
                        defaultValue="/content/drive/MyDrive"
                        label="Data Directory" 
                        ariaLabel="Data Directory" 
                    />
                    <InputField 
                        hasInfo 
                        onChange={(value) => setResultsDirectory(value)} 
                        value={resultsDirectory} 
                        defaultValue="/content/drive/MyDrive"
                        label="Results Directory" 
                        ariaLabel="Results Directory" 
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
                        onChange={(value) => setSelectedDataSize(value)} 
                        defaultValue={dataSize} 
                        value={selectedDataSize} 
                        label="Data Size" 
                        ariaLabel="Data Size" 
                    />
                </Stack>
            </Paper>
        </Box>
    );
}

export default ParameterWindow;
