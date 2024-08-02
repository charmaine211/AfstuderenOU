import React from 'react';
import PropTypes from 'prop-types';

import {
    TextField, 
    MenuItem, 
    Stack,
} from '@mui/material';

import InfoButton from './InfoButton';

function DropdownField({ title, onSelect, menuItems, helperText, id, hasInfo, info = "", ariaLabel }){
    return(
        <Stack direction="row" spacing={1} alignItems="center" style={{  }}>
            <TextField
                id={id}
                select
                label={title}
                helperText={helperText}
                variant="outlined"
                onChange={onSelect}
                style={{minWidth:"10em"}}
                >
                {menuItems.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
            </TextField>
            {hasInfo && <InfoButton text={info}/>}
        </Stack>
    );
}

DropdownField.propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired, 
    helperText: PropTypes.string.isRequired, 
    onSelect: PropTypes.func.isRequired, 
    id: PropTypes.string.isRequired, 
    hasInfo: PropTypes.bool.isRequired, 
    info: PropTypes.string, 
    ariaLabel: PropTypes.string.isRequired,
}

  
export default DropdownField;