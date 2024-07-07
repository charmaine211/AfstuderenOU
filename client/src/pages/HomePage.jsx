import React from 'react';
import isElectron from 'is-electron';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faChartSimple, faUserTag } from '@fortawesome/free-solid-svg-icons';

import { Grid, Link, Typography, Paper } from "@mui/material"

import TitleTextBlock from "../components/molecules/TitleTextBlock"
import PageWrapper from '../components/organisms/PageWrapper';

function HomePage() {
    const iconStyle = {
        fontSize: "5em", color: "#48A3C0" 
    }

    const trainingIcon = <FontAwesomeIcon icon={faGear} style={iconStyle} />;
    const predictIcon = <FontAwesomeIcon icon={faChartSimple} style={iconStyle} />;
    const labelIcon = <FontAwesomeIcon icon={faUserTag} style={iconStyle} />

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

    const paperStyle = {
        width: "12em",
        height: "12em",
        marginTop: "5em",
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2em",
        boxShadow: "0 4px 8px #E3F2F6",
        transition: "transform 0.3s",
    };

    const paperHoverStyle = {
        transform: "scale(1.05)",
    };

    const title = "Automatic driver gaze annotation";
    const text = "Our platform provides researchers and safety professionals with a streamlined solution for annotating driver images and videos using AI. With a user-friendly interface and clear instructions, we aim to simplify the annotation process and ensure accurate results.";

    const features = [
        { icon: labelIcon, title: 'Label data', path: '/label' },
        { icon: trainingIcon, title: 'Train', path: '/train' },
        { icon: predictIcon, title: 'Predict', path: '/predict' },
    ];

    return (
        <PageWrapper>
            <TitleTextBlock title={title} text={text} />
            <Grid container spacing={10} style={containerStyle}>
                {features.map((feature, index) => (
                    <Grid item key={index} style={itemStyle}>
                        <Link href={feature.path} underline="none">
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
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </PageWrapper>
    );
}

export default HomePage;
