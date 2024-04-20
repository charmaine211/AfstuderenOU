import React from 'react';
import Button from '@mui/material/Button';

function BrowseButton () {
    return (
        <Button variant="outlined" sx={ { borderRadius: 10 } }>Browse files</Button>
    );
}

export default BrowseButton;