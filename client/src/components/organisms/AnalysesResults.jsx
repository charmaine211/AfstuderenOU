import React from 'react';
import { Typography } from '@mui/material';

import { downloadPredictionCSV } from "../../common/utils/download"

import DownloadButton from "../atoms/DownloadButton";

// import { 
//     CLASSES, MOCK_RESULTS_IMAGE_CLASSIFICATION 
// } from '../../constants/model';

// import AnalyseVideoChart from '../molecules/AnalyseVideoChart';
// import RandomImageResult from '../molecules/RandomImageResult';

function AnalysesResults( { results } ){

    // CONSTANTS
    const fileNames = Object.keys(results);


    // HANDLERS
    const handleDownload = () => {
        downloadPredictionCSV(results);
    }

    // RENDERER
    return (
    <>        
        <DownloadButton onClick={ handleDownload } />

        {/* <RandomImageResult avFile={path} result={"highestPrediction[JSON.stringify(result.filename)]"}/> */}
        {/* // <AnalyseVideoChart  */}
        {/* // videotitle="Test data"
        // classes= { Object.keys(CLASSES) }
        // data = { results }/> */}
        {/* {JSON.stringify(result)} */}
    </>
        
    );
}

export default AnalysesResults;