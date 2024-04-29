import React from 'react';
import { 
    CLASSES, MOCK_RESULTS_IMAGE_CLASSIFICATION 
} from '../../constants/model';

import AnalyseVideoChart from '../molecules/AnalyseVideoChart';

function AnalysesResults(){

    return (
        <AnalyseVideoChart 
        videotitle="Test data"
        classes= { CLASSES }
        data = { MOCK_RESULTS_IMAGE_CLASSIFICATION }/>
    );
}

export default AnalysesResults;