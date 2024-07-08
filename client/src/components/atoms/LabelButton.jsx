import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

function DownloadButton ({ onClick }) {
    return (
        <Button variant="contained" style={{ color: "white", width: "10em", padding: "1em" }} onClick={onClick}>Label</Button>
    );
}

DownloadButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default DownloadButton;