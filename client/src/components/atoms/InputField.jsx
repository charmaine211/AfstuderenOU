import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import HelpIcon from '@mui/icons-material/Help';

function InputField({ hasInfo, onChange, value, ariaLabel}){
    return(
        <>
            <TextField 
                id="outlined-basic" 
                label="Outlined" 
                variant="outlined" 
                value={value}
                onChange={onChange}
                  />
            {hasInfo && < HelpIcon />}
        </>
    );
}

InputField.propTypes = {
    onChange: PropTypes.func.isRequired, 
    value: PropTypes.string.isRequired, 
    ariaLabel: PropTypes.string.isRequired,
}

export default InputField;