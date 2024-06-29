import React, { useState, useEffect } from 'react';

import { Container } from '@mui/material';

import { predictAnalysis } from '../common/api/predict';

import PageWrapper from '../components/organisms/PageWrapper';
import InputModel from '../components/organisms/InputModel';
import InputAV from '../components/organisms/InputAV';
import AnalysesResults from '../components/organisms/AnalysesResults';
import TitleTextBlock from '../components/molecules/TitleTextBlock'


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
    const [analysisResult, setAnalysisResult] = useState(null);

    // HANDLERS
    function handleModelUpload(files){
        if (files.length > 0){
            setModelFile(files[0]);
            setModelIsUploaded(true);
        } else {
            alert(`ERROR: Upload the right format`);
        }
    }

    function handleAvUpload(files){
        if (files.length > 0){
            setAvFiles(files);
            setAvIsUploaded(true);
        } else {
            alert(`ERROR: Upload the right format`);
        }
    }

    async function predict() {
        const response = await predictAnalysis(modelFile, avFiles);
        setAnalysisResult(response);
    }

    useEffect(() => {
        if (modelFile && avFiles) {
            predict();
        }
    }, [modelFile, avFiles]);

    return (
        <PageWrapper>
            {!modelIsUploaded && 
            <>
                <TitleTextBlock
                    title="Upload model"
                    text="Upload a trained Ultralytics YOLO model.
                    If you don't have a trained model, download the instructions here."/>
                <Container 
                maxWidth="sm" 
                style={ containerStyle }>
                    <InputModel
                        onUploaded={ handleModelUpload} />
                </Container>
            </>}
            {modelIsUploaded && !avIsUploaded && 
            <>
                <TitleTextBlock
                title='Upload  images and/or videos'
                text='Upload video and/or image files of drivers for analysis by the model.'/>
                <Container
                maxWidth="sm" 
                style={ containerStyle }>
                    <InputAV  
                        onUploaded={ handleAvUpload } />
                </Container>
            </>} 
            {modelIsUploaded && avIsUploaded && 
            <>
                <TitleTextBlock
                title='Analysis'
                text='Results of the analysis of your files'/>
                <Container
                maxWidth="sm" 
                style={ containerStyle }>
                    <AnalysesResults />
                </Container>
            </>}
        </PageWrapper>
    
    );
}

export default PredictPage;