import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faChartSimple } from '@fortawesome/free-solid-svg-icons';

import {Grid, Link, Typography, Paper } from "@mui/material"

import TitleTextBlock from "../components/molecules/TitleTextBlock"
import PageWrapper from '../components/organisms/PageWrapper';

// "../../assets/collectDataset"
// import  from ;
// import from "../../assets/train";
// import predictIcon from "../../assets/predict";

function HomePage() {

    const collectDatasetIcon = "";
    // require('./client/assets/collectDataset.svg')
    const trainingIcon  = <FontAwesomeIcon icon={faGear} style={{fontSize: "20em", color: "#48A3C0"}}/>;
    const predictIcon = <FontAwesomeIcon icon={faChartSimple} style={{fontSize: "20em", color: "#48A3C0"}}/>;
    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: "3em",
    };


    const title = "Automatic driver gaze annotation";
    const text = "Our platform provides researchers and safety professionals with a streamlined solution for annotating driver images and videos using AI. With a user-friendly interface and clear instructions, we aim to simplify the annotation process and ensure accurate results."
    const features = [
        // { icon: collectDatasetIcon, title: 'Collect dataset', path: '/collect-dataset' },
        { icon: trainingIcon, title: 'Training', path: '/train' },
        { icon: predictIcon, title: 'Predict', path: '/predict' },
    ];

    return (
        <PageWrapper>
            <TitleTextBlock title={title} text={text} />
            <Grid container spacing={15} style={containerStyle}>
                {features.map((feature, index) => (
                    <Grid item key={index} >
                     <Link href={feature.path} underline="none">
                        <Paper style={{ width: "30em", height: "30em", borderRadius: 10, justifyContent:"center", textAlign:"center" }} >
                            <Typography variant="h4" style={{ marginBottom: "1em" }}>
                                {feature.title}
                            </Typography>
                                
                            {feature.icon}
                                
                        </Paper>
                    </Link>
                    </Grid>
                ))}
            </Grid>
        </PageWrapper>
    );
}

export default HomePage;
