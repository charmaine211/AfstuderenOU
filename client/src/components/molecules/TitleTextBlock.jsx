import React from 'react';
import PropTypes from 'prop-types';
import Title from '../atoms/Title';
import Text from '../atoms/Text';


function TitleTextBlock ({ title, text }) {
    
    return (
        <>
            <Title title={title}/>
            <Text text={text}/>
        </>
    );
}

TitleTextBlock.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}

export default TitleTextBlock;