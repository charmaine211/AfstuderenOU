import React from 'react';
import PropTypes from 'prop-types';



import {FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel ,
    FormHelperText,
    Checkbox,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

function MultiSelect({ title, options, hasInfo, ariaLabel }){
    return(
        <FormControl
        required
        error={"error"}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">
            { title }
            {hasInfo && < HelpIcon />}
        </FormLabel>
        <FormGroup>

        {options.map((option) => (
          <FormControlLabel
            control={
                <Checkbox checked={option.value} onChange={()=>{}} name={option.value} />
            }
            label={option.value}
        />

        ))}
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
      </FormControl>
    );
}

MultiSelect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    hasInfo: PropTypes.bool.isRequired, 
    ariaLabel: PropTypes.string.isRequired,
}

export default MultiSelect;