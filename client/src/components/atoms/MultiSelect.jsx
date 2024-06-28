import React from 'react';
import PropTypes from 'prop-types';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

function MultiSelect({ title, options, setSelected, hasInfo, ariaLabel }) {
  
  const handleSelect = (event) => {
    
    const value = event.target.name;

    setSelected((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  return (
    <FormControl component="fieldset" sx={{ m: 3 }} variant="standard">
      <FormLabel component="legend">
        {title}
        {hasInfo && <HelpIcon />}
      </FormLabel>
      <FormGroup>
        <Grid container spacing={2}>
          {options.map((option) => (
            <Grid item xs={6} key={option} sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleSelect}
                    name={option}
                  />
                }
                label={option}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    </FormControl>
  );
}

MultiSelect.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelected: PropTypes.func.isRequired,
  hasInfo: PropTypes.bool.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

export default MultiSelect;
