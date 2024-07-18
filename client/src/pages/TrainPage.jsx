import React, {useState} from 'react';
import { Grid, Stack } from "@mui/material"

import TitleTextBlock from '../components/molecules/TitleTextBlock';
import PageWrapper from '../components/organisms/PageWrapper';
import TrainParameterWindow from '../components/organisms/TrainParameterWindow';
import TaskSelector from "../components/atoms/TaskSelector";

function TrainPage () {

    const [isImageClassification, setIsImageClassification] = useState(true);
    const [isObjectDetection, setIsObjectDetection] = useState(false);

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "1em",
        marginBottom: "5em",
        width: "100%",
    };

    return (
    <PageWrapper>
        <TitleTextBlock title="Train model" text="" /> 
        <Stack 
        style={{        
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "5em",
        }}>
            <TaskSelector setIsImageClassification={setIsImageClassification} setIsObjectDetection={setIsObjectDetection}/>
            <TrainParameterWindow isImageClassification={isImageClassification} isObjectDetection={isObjectDetection}/>
        </Stack>
    </PageWrapper>
    
    );
}

export default TrainPage;