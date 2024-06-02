import React, { useState } from 'react';

import PageWrapper from '../components/organisms/PageWrapper';

import TitleTextBlock from '../components/molecules/TitleTextBlock'

import InputModel from '../components/organisms/InputModel';
import InputAV from '../components/organisms/InputAV';
import AnalysesResults from '../components/organisms/AnalysesResults';


function PredictPage () {
    const [modelIsUploaded, setModelIsUploaded] = useState(false);
    const [avIsUploaded, setAvIsUploaded] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [avFiles, setAvFiles] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [modelFile, setModelFile] = useState("");

    // HANDLERS
    function handleModelUpload(files){
        setModelFile(files[0]);
        setModelIsUploaded(true);
    }

    function handleAvUpload(files){
        setAvFiles(files);
        setAvIsUploaded(true);
    }

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