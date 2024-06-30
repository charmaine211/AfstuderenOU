import React from 'react';
import PropTypes from 'prop-types';

import {
    TextField, 
    MenuItem, 
} from '@mui/material';

import InfoButton from './InfoButton';

function DropdownField({ menuItems, helperText, id, hasInfo, info, ariaLabel }){
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
        {hasInfo && <InfoButton text={info}/>}
      </>
    );
}

DropdownField.propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.string),
    helperText: PropTypes.string.isRequired, 
    id: PropTypes.string.isRequired, 
    hasInfo: PropTypes.bool.isRequired, 
    info: PropTypes.string, 
    ariaLabel: PropTypes.string.isRequired,
}

DropdownField.defaultProps = {
    info: ""
  };
  
export default DropdownField;