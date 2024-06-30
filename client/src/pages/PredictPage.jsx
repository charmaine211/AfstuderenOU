import React, { useState, useEffect } from 'react';

import { Container, CircularProgress, Grid } from '@mui/material';

import { predictAnalysis } from '../common/api/predict';

import PageWrapper from '../components/organisms/PageWrapper';
import InputModel from '../components/organisms/InputModel';
import InputAV from '../components/organisms/InputAV';
import AnalysesResults from '../components/organisms/AnalysesResults';
import TitleTextBlock from '../components/molecules/TitleTextBlock'
import UploadedFiles from "../components/atoms/UploadedFiles";

function PredictPage () {

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: "5em",
    };

    const [modelIsUploaded, setModelIsUploaded] = useState(false);
    const [avIsUploaded, setAvIsUploaded] = useState(false);
    const [avFiles, setAvFiles] = useState(null);
    const [modelFile, setModelFile] = useState(null);
    const [analysisResults, setAnalysisResults] = useState([]);
    const [predicting, setPredicting] = useState(false);

    // HANDLERS
    function handleModelUpload(files){
        if (files.length > 0){
            setModelFile(files[0]);
            setModelIsUploaded(true);
        } else {
            alert(`ERROR: Upload the right format`);//TODO error
        }
    }

    function handleAvUpload(files){
        if (files.length > 0){
            setAvFiles(files);
            setAvIsUploaded(true);
        } else {
            alert(`ERROR: Upload the right format`);// TODO error
        }
    }

    const handleRemoveModel = () => {
        setModelFile("");
        setModelIsUploaded(false);
    }

    const handleRemoveFile = (file) => {
        setAvFiles((prevValue) => {
            const updatedFiles = prevValue.filter((value) => value !== file);
            if (updatedFiles.length === 0) {
                setAvIsUploaded(false);
            }
            return updatedFiles;
        });
    }

    // FUNCTIONS
    async function predict() {
        setPredicting(true);
        const response = await predictAnalysis(modelFile, avFiles);    
        setPredicting(false);
        setAnalysisResults(response);
    }

    useEffect(() => {
        if (modelIsUploaded && avIsUploaded) {
            predict();
        }
    }, [modelFile, avFiles]);

    return (
        <PageWrapper>
            <TitleTextBlock
                    title={modelIsUploaded && avIsUploaded ? "Analysis" : "Upload model and audiovisual files"}
                    text={modelIsUploaded && avIsUploaded ? 'Results of the analysis of your files' : "Upload a trained Ultralytics YOLO model and video and/or image files of drivers for analysis by the model. If you don't have a trained model, download the instructions here."}/>

            {(modelIsUploaded && avIsUploaded) ?
            <>
                <Container
                maxWidth="sm" 
                style={ containerStyle }>
                    {predicting ? < CircularProgress /> : <AnalysesResults results= { analysisResults } />}
                </Container>
            </> :
            <Grid container style={ containerStyle } spacing={10}>
                <Grid item>
                    {modelIsUploaded ? <UploadedFiles files={[modelFile]} removeFiles={handleRemoveModel} /> : <InputModel onUploaded={ handleModelUpload} />}
                </Grid>
                <Grid item>
                    { avIsUploaded ? <UploadedFiles files={avFiles} removeFiles={handleRemoveFile} />: <InputAV onUploaded={ handleAvUpload } />}
                </Grid>

            </Grid>}
        </PageWrapper>
    
    );
}

export default PredictPage;