import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faChartSimple, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { Grid, Link as UILink, Typography, Paper } from "@mui/material";
import TitleTextBlock from "../components/molecules/TitleTextBlock";
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
        { icon: labelIcon, title: 'Label data', path: '#/label' },
        { icon: trainingIcon, title: 'Train', path: '#/train' },
        { icon: predictIcon, title: 'Predict', path: '#/predict' },
    ];

    return (
        <PageWrapper>
            <TitleTextBlock title={title} text={text} />
            <Grid container spacing={15} style={containerStyle}>
                {features.map((feature, index) => (
                    <Grid item key={index} style={itemStyle}>
                        <UILink href={feature.path} underline="none">
                            <Paper 
                                style={paperStyle} 
                                onMouseEnter={e => e.currentTarget.style.transform = paperHoverStyle.transform}
                                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                            >
                                <Typography variant="h5" style={{ marginBottom: "1em" }}>
                                    {feature.title}
                                </Typography>
                                {feature.icon}
                            </Paper>
                        </UILink>
                    </Grid>
                ))}
            </Grid>
        </PageWrapper>
    );
}

export default HomePage;
