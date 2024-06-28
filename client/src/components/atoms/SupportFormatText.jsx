import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import { formatFileFormats } from '../../common/utils/formatters';

function SupportFormatText ({ formats }) {
    
    const formatString = formatFileFormats( formats );
    
    return (
       <Typography style={{ fontSize: 12, }}>Supported formats:   <strong>{formatString}</strong></Typography>
    );
}

SupportFormatText.propTypes = {
    formats: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default SupportFormatText;