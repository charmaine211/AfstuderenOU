import React from 'react';
import { Box } from '@mui/material';

import PropTypes from 'prop-types';
import Title from '../atoms/Title';
import Text from '../atoms/Text';


function TitleTextBlock ({ title, text }) {
    
    return (
        <Box style={{ margin: 50, }}>
            <Title title={title}/>
            <Box style={{ width: "50%", marginTop: "1em"}}>
                <Text text={text}/>
            </Box>
        </Box>
    );
}

TitleTextBlock.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}

export default TitleTextBlock;