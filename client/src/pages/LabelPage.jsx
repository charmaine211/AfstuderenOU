import React, {useState} from 'react';

import { Grid, Stack, Typography, Button, Box } from "@mui/material";

import TitleTextBlock from '../components/molecules/TitleTextBlock';
import PageWrapper from '../components/organisms/PageWrapper';
import LabelParameterWindow from "../components/organisms/LabelParameterWindow";
import ImageClassificationFileTree from "../components/molecules/ImageClassificationFileTree";
import ObjectDetectionFileTree from "../components/molecules/ObjectDetectionFileTree";
import TaskSelector from "../components/atoms/TaskSelector";

function LabelPage () {

    const [isImageClassification, setIsImageClassification] = useState(true);
    const [isObjectDetection, setIsObjectDetection] = useState(false);
    const [showLabelWindow, setShowLabelWindow] = useState(false);

    const introTextIC = `For image classification tasks each of the directories should contain one subdirectory for each class in the dataset. The subdirectories are named after the corresponding class and contain all the images for that class. Ensure that each image file is named uniquely and stored in a common format such as JPEG or PNG.`;

    const introTextOD = `For object detection tasks each of the directories should contain corresponding images and label files. Ensure that each image file is named uniquely and stored in a common format such as JPEG or PNG. Each image should have an associated label file with the same name but with a .txt extension.
Each label file should be formatted with one row per object in the image, using the YOLO format. This format includes the object's class index, along with the normalized coordinates of the bounding box (x_center, y_center, width, height).`;

    const fileStructureOD =                            
    (<ul>
    <li>
        <span style={{color:"#74BCD2"}}>root</span>: This directory serves as the main folder for your project and can be named according to your preference.
        <ul>
            <li>
                <span style={{color:"#FA873F"}}>training results</span>: Within this directory, we'll place any files or data related to training results. Its name can also be customized.
            </li>
            <li>
                <span style={{color:"#FA873F"}}>dataset</span>: Here, you'll organize your training, testing, and validation datasets. You can name this directory as you see fit.
                <ul>
                    <li>
                    <span style={{color:"#3CD19D"}}>images</span>: Here, you'll organize your training, testing, and validation images. The name "images" is mandatory.
                    <ul>
                        <li>
                            <span style={{color:"#EE577E"}}>train</span>: This folder contains the training images. Each image should have a corresponding label file in the "labels/train" directory.
                        </li>
                        <li>
                            <span style={{color:"#EE577E"}}>val</span>: Similarly, this folder contains the validation images, each with its corresponding label file in the "labels/val" directory.
                        </li>
                        <li>
                            <span style={{color:"#EE577E"}}>test</span>: This directory holds the test images, which are used for final model evaluation.
                        </li>
                    </ul>
                    </li>

                    <li>
                        <span style={{color:"#3CD19D"}}>labels</span>: Here, you organize your training, testing, and validation label files corresponding to the images. This directory must be named "labels".
                        <ul>
                            <li>
                                <span style={{color:"#EE577E"}}>train</span>: This folder contains the label files for the training images. Each label file should have the same name as its corresponding image file, but with a ".txt" extension.
                            </li>
                            <li>
                                <span style={{color:"#EE577E"}}>val</span>: Similarly, this folder contains the label files for the validation images, following the same naming convention.
                            </li>
                            <li>
                                <span style={{color:"#EE577E"}}>test</span>: This directory is added to document the final model results, following the same naming convention.
                            </li>

                        </ul>
                    </li>

                 </ul>
            </li>

        </ul>
    </li>
    
</ul>);

const fileStructureIC =  (
    <ul>
        <li>
            <span style={{color:"#74BCD2"}}>root</span>: This directory serves as the main folder for your project and can be named according to your preference.
            <ul>
                <li>
                    <span style={{color: "#FA873F"}}>training results</span>: Within this directory, we'll place any files or data related to training results. Its name can also be customized.
                </li>
                <li>
                    <span style={{color:"#FA873F"}}>dataset</span>: Here, you'll organize your training, testing, and validation datasets. You can name this directory as you see fit.
                    <ul>
                        <li>
                            <span style={{color:"#EE577E"}}>train</span>: This folder contains subdirectories for each class in your training dataset. The name "train" is mandatory for training purposes.
                            <ul>
                                <li>
                                    <span style={{fontWeight: 900}}>class_...</span>: Each subdirectory corresponds to a specific class (e.g., class_1, class_2, etc.), containing the related dataset purposes.
                                </li>
                            </ul>                            
                        </li>
                        <li>
                            <span style={{color:"#EE577E"}}>val</span>: Similar to the train directory, this folder houses validation dataset subdirectories. The name "val" is required for validation.
                            <ul>
                                <li>
                                    <span style={{fontWeight: 900}}>class_...</span>: Each subdirectory corresponds to a specific class (e.g., class_1, class_2, etc.), containing the related dataset purposes.
                                </li>
                            </ul>                            
                        </li>
                        <li>
                            <span style={{color:"#EE577E"}}>test</span>: This directory is added to document the final model results. It follows the same structure as the training and validation sets.
                            <ul>
                                <li>
                                    <span style={{fontWeight: 900}}>class_...</span>: Each subdirectory corresponds to a specific class (e.g., class_1, class_2, etc.), containing the related dataset purposes.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
    );

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginBottom: "5em",
    };

    const centerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    };

    const handleStartLabelling = () => {
        setShowLabelWindow(preValue => {
            return !preValue;
        });
    }

    return (
    <PageWrapper>
        
        <TitleTextBlock title="Label dataset" text="For Ultralytics YOLO tasks, the dataset must be organized in a specific split-directory structure under the root directory to facilitate proper training, testing, and optional validation processes." /> 
        
        <Stack 
            style={{        
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            
            <TaskSelector setIsImageClassification={setIsImageClassification} setIsObjectDetection={setIsObjectDetection}/>

            <Grid container
                    style={       
                        {...centerStyle,
                            padding: "0em 15em 10em 20em",
                        }}
                        spacing={2}>
                <Grid item xs={12} style={{...centerStyle}}>
                    <Typography 
                        variant="p"
                        style={{
                            wordWrap: "break-word",
                            paddingBottom: "1em",
                        }}>{isImageClassification ? introTextIC : introTextOD }</Typography>
                </Grid>

                {isImageClassification &&
                    <>
                        <Grid item xs={12} md={6} style={{textAlign: "left", alignItems: "start"}}>
                            {fileStructureIC}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ImageClassificationFileTree/> 
                        </Grid>
                    </>
                }
                {isObjectDetection && 
                (showLabelWindow ? 
                    <>
                        <Grid item xs={12} md={6} style={{ display: "flex", alignItems: "start" }}>
                            <LabelParameterWindow/>
                        </Grid>
                        <Grid item xs={12} md={6} style={{ textAlign: "left", alignItems: "start" }}>
                            <Typography style={{ display: "flex", textAlign: "left", alignItems: "start" }}>
                                To automatically label your dataset, ensure that it is in the Image Classification dataset structure: Images are organised into labeled directories corresponding to their categories.
                            </Typography>
                            <Box sx={{ m: '2rem' }}/>
                            <Typography style={{ display: "flex", textAlign: "left", alignItems: "start" }}>
                                Additionally, prepare your destination directories by structuring them according to the Object Detection dataset requirements. Start by creating a dataset directory containing the 'images' and 'labels' folders. Within each of these folders, create 'train', 'test', and 'val' subdirectories to properly organise your data.
                            </Typography>
                            <Box sx={{ m: '2rem' }}/>
                            <Typography style={{ display: "flex", textAlign: "left", alignItems: "start" }}>
                                Automatic labelling will place a copy of your image files into the corresponding 'train', 'test', and 'val' subfolders of the 'images' directory. Please make sure that each image has a unique name. 
                            </Typography>
                            <Typography style={{ display: "flex", textAlign: "left", alignItems: "start" }}>
                                In the 'labels' directory, the label files will be stored in the corresponding 'train', 'test', and 'val' subfolders. These labelled files will match the images and contain the necessary bounding box data required for object detection.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{paddingTop: "3em"}}>
                            <Button variant="text" onClick={handleStartLabelling}>Return</Button>
                        </Grid>
                    </>
                    : 
                <>
                    <Grid item md={3} xs={12} style={{display: "flex", alignItems: "start"}}>
                        <ObjectDetectionFileTree/>
                    </Grid>
                    <Grid item md={9} xs={12} style={{display: "flex", textAlign: "left", alignItems: "start"}}>
                        <Stack>
                            {fileStructureOD}
                            {/**TODO */}
                            {false && <Button variant="text" onClick={handleStartLabelling}>Start automatic relabelling image classification to object detection</Button>}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} style={{paddingBottom: "3em"}}>
                        
                    </Grid>
                </>)}
            </Grid>
        </Stack>
    </PageWrapper>
    
    );
}

export default LabelPage;