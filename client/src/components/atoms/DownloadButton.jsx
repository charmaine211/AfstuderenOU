import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

function DownloadButton ({ text }) {
    return (
        <Button variant="contained">Download {text}</Button>
    );
}

DownloadButton.propTypes = {
    text: PropTypes.string,
}

DownloadButton.defaultProps = {
    text: "",
}

export default DownloadButton;