import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';

import GoogleDrive from '../components/molecules/GoogleDrive';
import GoogleColab from '../components/molecules/GoogleColab';
import LightningAI from '../components/molecules/LightningAI';

function TrainPage () {
    return (
    <PageWrapper>
        <h1>Train</h1>  

        <GoogleDrive/>
        <GoogleColab/>
        <LightningAI/>
    </PageWrapper>
    
    );
}

export default TrainPage;