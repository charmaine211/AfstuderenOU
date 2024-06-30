import React from 'react';

import TitleTextBlock from '../components/molecules/TitleTextBlock';
import PageWrapper from '../components/organisms/PageWrapper';
import ParameterWindow from '../components/organisms/ParameterWindow';

function TrainPage () {
    return (
    <PageWrapper>
        <TitleTextBlock title="Train model" text="" /> 
        <ParameterWindow/>
    </PageWrapper>
    
    );
}

export default TrainPage;