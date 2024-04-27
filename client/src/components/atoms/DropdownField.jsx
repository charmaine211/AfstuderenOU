import React from 'react';
import PropTypes from 'prop-types';

import {
    TextField, 
    MenuItem, 
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

function DropdownField({ menuItems, hasInfo, helperText, id, ariaLabel }){
    return(
        <>
        <TextField
            id={id}
            select
            label="Select"
            helperText={helperText}
            variant="standard"
            >
            {menuItems.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
        </TextField>
        {hasInfo && < HelpIcon />}
      </>
    );
}

DropdownField.propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.string),
    hasInfo: PropTypes.bool.isRequired, 
    helperText: PropTypes.string.isRequired, 
    id: PropTypes.string.isRequired, 
    ariaLabel: PropTypes.string.isRequired,
}

export default DropdownField;