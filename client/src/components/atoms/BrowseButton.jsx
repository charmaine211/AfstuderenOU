import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

function BrowseButton ({ formats }) {
    const ref = useRef()
    
    const handleClick = ()=> {
        ref.current.click();
    }

    return (
        <>
            <Button 
                variant="outlined" 
                sx={ { borderRadius: 10 } }
                onClick={handleClick}
            >Browse files</Button>
            <input 
                ref={ref}
                type="file" 
                id="input-file-upload" 
                multiple={true} 
                accept={ formats }/>
        </>
    );
}

BrowseButton.propTypes = {
    formats: PropTypes.string.isRequired,
}

export default BrowseButton;