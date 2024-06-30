import React from 'react';

import {Stack} from "@mui/material"

import TitleTextBlock from "../components/molecules/TitleTextBlock"
import PageWrapper from '../components/organisms/PageWrapper';

// "../../assets/collectDataset"
// import  from ;
// import from "../../assets/train";
// import predictIcon from "../../assets/predict";

function HomePage() {

    const collectDatasetIcon = "";
    // require('./client/assets/collectDataset.svg')
    const trainingIcon  = "";
    // require('./client/assets/train.svg')
    const predictIcon = "";
    // require('./client/assets/predict.svg')


    const title = "Automatic driver gaze annotation";
    const text = "Our platform provides researchers and safety professionals with a streamlined solution for annotating driver images and videos using AI. With a user-friendly interface and clear instructions, we aim to simplify the annotation process and ensure accurate results."
    const features = [
        { icon: collectDatasetIcon, title: 'Collect dataset', path: '/collect-dataset' },
        { icon: trainingIcon, title: 'Training', path: '/train' },
        { icon: predictIcon, title: 'Predict', path: '/predict' },
    ];

    return (
        <PageWrapper>
            <TitleTextBlock title={title} text={text}/>
            <Stack style={{                 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',}}>
            {features.map((feature) => {
                return <a href={feature.path} key={feature.title}>{feature.title}</a>
            })}
            </Stack>
        </PageWrapper>
    );
}

export default HomePage;
