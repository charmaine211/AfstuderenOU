import React from 'react';
import { Typography, Stack, Link } from '@mui/material';

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
    const stackStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: "5em",    
    };

    // HANDLERS
    const handleDownload = () => {
        downloadPredictionCSV(results);
    }

    // RENDERER
    return (     
        <Stack style={stackStyle} spacing={2}>
            <Typography>
                Your annotated files have been uploaded to your system. Please download the additional CSV file here.
            </Typography>
            <DownloadButton onClick={ handleDownload } />
            <Link href="/predict">
                <Typography>
                    Analyse more files
                </Typography>
            </Link>

        </Stack>
        
    );
}

export default AnalysesResults;