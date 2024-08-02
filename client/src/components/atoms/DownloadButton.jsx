import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

function DownloadButton ({ text="", onClick }) {
    return (
        <Button variant="contained" style={{ color: "white", width: "10em", padding: "1em" }} onClick={onClick}>Download {text}</Button>
    );
}

DownloadButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string,
}

export default DownloadButton;