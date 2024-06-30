import React, { useRef } from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button'; // Aangepast import voor Button

function BrowseButton ({ formats, onFileSelect }) {
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click(); 
    }

    const handleFileChange = (e) => {
        const files = e.target.files; 

        if (files && files.length > 0) {
            onFileSelect(files);
        }
    }

    return (
        <>
            <Button 
                variant="outlined" 
                sx={{ borderRadius: 10 }}
                onClick={handleClick}
            >
                Browse files
            </Button>
            <input 
                ref={inputRef}
                type="file" 
                id="input-file-upload-browse"
                multiple={true} 
                accept={formats}
                onChange={handleFileChange} // onChange handler toegevoegd
                style={{ display: 'none' }} // Verberg het input element
            />
        </>
    );
}

BrowseButton.propTypes = {
    formats: PropTypes.string.isRequired,
    onFileSelect: PropTypes.func.isRequired,
};

export default BrowseButton;
