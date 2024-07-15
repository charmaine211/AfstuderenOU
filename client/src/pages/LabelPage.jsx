import React, {useState} from 'react';

import { Grid, Stack, Typography } from "@mui/material";

import ICExample from "../assets/forward_left_camera_1_cycle_1_frame_72.jpg";
import ODExample from "../assets/forward_left_camera_1_cycle_1_frame_72_annotated.png";

import TitleTextBlock from '../components/molecules/TitleTextBlock';
import PageWrapper from '../components/organisms/PageWrapper';
import LabelParameterWindow from "../components/organisms/LabelParameterWindow";
import ImageClassificationFileTree from "../components/molecules/ImageClassificationFileTree";
import ObjectDetectionFileTree from "../components/molecules/ObjectDetectionFileTree";
import TaskSelector from "../components/atoms/TaskSelector";

function LabelPage () {

    const [isImageClassification, setIsImageClassification] = useState(true);
    const [isObjectDetection, setIsObjectDetection] = useState(false);

    const introTextIC = `For image classification tasks each of the directories should contain one subdirectory for each class in the dataset. The subdirectories are named after the corresponding class and contain all the images for that class. Ensure that each image file is named uniquely and stored in a common format such as JPEG or PNG.`;

    const introTextOD = `For object detection tasks each of the directories should contain corresponding images and label files. Ensure that each image file is named uniquely and stored in a common format such as JPEG or PNG. Each image should have an associated label file with the same name but with a .txt extension.
Each label file should be formatted with one row per object in the image, using the YOLO format. This format includes the object's class index, along with the normalized coordinates of the bounding box (x_center, y_center, width, height).`;

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
        <TitleTextBlock title="Label dataset" text="For Ultralytics YOLO tasks, the dataset must be organized in a specific split-directory structure under the root directory to facilitate proper training, testing, and optional validation processes. This structure includes separate directories for training (train) and testing (test) phases, with an optional directory for validation (val)." /> 
        <Stack 
        style={{        
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
        }}>
            <TaskSelector setIsImageClassification={setIsImageClassification} setIsObjectDetection={setIsObjectDetection}/>
            <figure>
                <img src={ isImageClassification ? ICExample : ODExample } style={{maxWidth:"20em"}}/>
                <figcaption>Example image{isImageClassification ? " image classification" : " object detection"}</figcaption>
            </figure>
            <Typography 
            variant="subtitle1"
            style={{
                marginLeft: "5em",
                marginRight: "5em",
                marginBottom: "1em",
                wordWrap: "break-word"
            }}>{isImageClassification ? introTextIC : introTextOD }</Typography>
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