import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

function Title ({ title }) {
    
    return (
       <Typography>{ title }</Typography>
    );
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Title;