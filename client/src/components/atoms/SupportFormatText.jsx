import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import { formatFormats } from '../../common/formatters';

function SupportFormatText ({ formats }) {
    
    const formatString = formatFormats( formats );
    
    return (
       <Typography>Supported formats: <strong>{formatString}</strong></Typography>
    );
}

SupportFormatText.propTypes = {
    formats: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default SupportFormatText;