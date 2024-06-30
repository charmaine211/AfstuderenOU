import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import HomeButton from './HomeButton';

function Title ({ title }) {
    
    return (
       <Typography variant="h4" >{<HomeButton/>}{ title }</Typography>
    );
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Title;