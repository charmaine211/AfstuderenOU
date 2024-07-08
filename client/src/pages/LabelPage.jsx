import React, {useState} from 'react';

import { Grid, Stack } from "@mui/material";

import TitleTextBlock from '../components/molecules/TitleTextBlock';
import PageWrapper from '../components/organisms/PageWrapper';
import LabelParameterWindow from "../components/organisms/LabelParameterWindow";
import ImageClassificationFileTree from "../components/molecules/ImageClassificationFileTree";
import ObjectDetectionFileTree from "../components/molecules/ObjectDetectionFileTree";
import TaskSelector from "../components/atoms/TaskSelector";

function LabelPage () {

    const [isImageClassification, setIsImageClassification] = useState(true);
    const [isObjectDetection, setIsObjectDetection] = useState(false);

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginBottom: "5em",
    };

    const itemStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    };

    return (
    <PageWrapper>
        <TitleTextBlock title="Label dataset" text="" /> 
        <Stack 
        style={{        
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
        }}>
            <TaskSelector setIsImageClassification={setIsImageClassification} setIsObjectDetection={setIsObjectDetection}/>
            <Grid container spacing={10} style={containerStyle}>
                <Grid item style={itemStyle}>
                    {isObjectDetection && <LabelParameterWindow />}
                </Grid>
                <Grid item style={itemStyle}>
                    {isImageClassification ? <ImageClassificationFileTree/> : <ObjectDetectionFileTree/>}
                </Grid>
            </Grid>
        </Stack>
    </PageWrapper>
    
    );
}

export default LabelPage;