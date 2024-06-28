import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

function Text ({ text }) {
    
    return (
       <Typography>{ text }</Typography>
    );
}

Text.propTypes = {
    text: PropTypes.string.isRequired,
}

export default Text;