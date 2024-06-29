import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

function InfoButton ({ text }) {
    return (
        <Tooltip title={text}>
            <HelpIcon fontSize="small"/>
        </Tooltip>
    );
}

InfoButton.propTypes = {
    text: PropTypes.string.isRequired,
}

export default InfoButton;