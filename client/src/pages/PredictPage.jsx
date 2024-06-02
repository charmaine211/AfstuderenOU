import React, { useState, useEffect } from 'react';

import { predictAnalysis } from '../common/api/predict';

import PageWrapper from '../components/organisms/PageWrapper';
import InputModel from '../components/organisms/InputModel';
import InputAV from '../components/organisms/InputAV';
import AnalysesResults from '../components/organisms/AnalysesResults';
import TitleTextBlock from '../components/molecules/TitleTextBlock'


function PredictPage () {
    const [modelIsUploaded, setModelIsUploaded] = useState(false);
    const [avIsUploaded, setAvIsUploaded] = useState(false);
    const [avFiles, setAvFiles] = useState(null);
    const [modelFile, setModelFile] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);

    // HANDLERS
    function handleModelUpload(files){
        setModelFile(files[0]);
        setModelIsUploaded(true);
    }

    function handleAvUpload(files){
        setAvFiles(files);
        setAvIsUploaded(true);
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
                <InputModel
                    onUploaded={ handleModelUpload} />
            </>}
            {modelIsUploaded && !avIsUploaded && 
            <>
                <TitleTextBlock
                title='Upload  images and/or videos'
                text='Upload video and/or image files of drivers for analysis by the model.'/>
                <InputAV  
                    onUploaded={ handleAvUpload } />
            </>} 
            {modelIsUploaded && avIsUploaded && 
            <>
                <TitleTextBlock
                title='Analysis'
                text='Results of the analysis of your files'/>
                <AnalysesResults />
            </>}
        </PageWrapper>
    
    );
}

export default PredictPage;