import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Grid,
} from '@mui/material';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import InfoButton from './InfoButton';

function MultiSelect({ title, options, setSelected, hasInfo, info="", ariaLabel }) {
  
  const convertToString = (value) => {
    if(value === -1){
      return "auto";
    }
    return value.toString();
  }

  const handleSelect = (event) => {
    const value = parseInt(event.target.name);
    alert(typeof value);
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
      <Typography variant="h6">
      {title}  {hasInfo && <InfoButton text={info} style={{margin: "1em"}}/>}
      </Typography>
      <FormGroup sx={{display: 'flex', alignItems: 'center', }}>
        <Grid container spacing={2} style={{margin:"0.1em", minWidth:"20em", maxWidth: "20em",padding: "1em"}}>
          {options.map((option, id) => (
            <Grid item xs={6} key={option} sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={id===0}
                    onChange={handleSelect}
                    name={option}
                    checkedIcon= {<SquareRoundedIcon />}
                  />
                }
                label={convertToString(option)}
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
  setSelected: PropTypes.func.isRequired,
  hasInfo: PropTypes.bool.isRequired,
  info: PropTypes.string, 
  ariaLabel: PropTypes.string.isRequired,
};

export default MultiSelect;
