import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

function SupportFormatText ({ formats }) {
    
    const formatString = formats.join(", ");
    
    return (
       <Typography>Supported formats: <strong>{formatString}</strong></Typography>
    );
}

SupportFormatText.propTypes = {
    formats: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default SupportFormatText;