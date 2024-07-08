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
        }}>
            <TaskSelector setIsImageClassification={setIsImageClassification} setIsObjectDetection={setIsObjectDetection}/>
        <Grid container spacing={10} style={containerStyle}>
            <Grid item  style={{margin: 0, padding: 0}}>
            <TrainParameterWindow isImageClassification={isImageClassification} isObjectDetection={isObjectDetection}/>
            </Grid>
        </Grid>
        </Stack>
    </PageWrapper>
    
    );
}

export default TrainPage;