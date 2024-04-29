import React, { useState } from 'react';
import InputModel from '../components/organisms/InputModel';
import InputAV from '../components/organisms/InputAV';
import AnalysesResults from '../components/organisms/AnalysesResults';


function PredictPage () {
    const [modelIsUploaded, setModelIsUploaded] = useState(true);
    const [avIsUploaded, setAvIsUploaded] = useState(false);

    // HANDLERS
    function handleModelUpload(){
        setModelIsUploaded(true);
    }

    function handleAvUpload(){
        setAvIsUploaded(true);
    }

    return (
        <>
            <h1>Predict</h1>
            {!modelIsUploaded && 
            <InputModel
                onUploaded={ handleModelUpload } />}
            {modelIsUploaded && !avIsUploaded && 
            <InputAV  
                onUploaded={ handleAvUpload } />} 
            {modelIsUploaded && avIsUploaded && <AnalysesResults />}
        </>
    
    );
}

export default PredictPage;