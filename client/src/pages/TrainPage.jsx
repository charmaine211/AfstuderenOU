import React from 'react';
import GoogleDrive from '../components/molecules/GoogleDrive';
import GoogleColab from '../components/molecules/GoogleColab';
import LightningAI from '../components/molecules/LightningAI';

function TrainPage () {
    return (
    <>
        <h1>Train</h1>  

        <GoogleDrive/>
        <GoogleColab/>
        <LightningAI/>

    </>
    
    );
}

export default TrainPage;