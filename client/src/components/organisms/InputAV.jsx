import React from "react";
import PropTypes from 'prop-types';

import DragDropFiles from "../molecules/DragDropFiles";

function InputAV({ 
    onUploaded,
}) {

    const formats = [
        "bmp", "dng", "jpeg", 
        "jpg", "mpo", "png", 
        "tif", "tiff", "webp", 
        "pfm", "asf", "avi", 
        "gif", "m4v", "mkv", 
        "mov", "mp4", "mpeg", 
        "mpg", "ts", "wmv", 
        "webm"]

    return (
        < DragDropFiles 
            formats={ formats } 
            onUploaded={ onUploaded } 
            uploadMultiple={ true }/>
    );
}

InputAV.propTypes = {
    onUploaded: PropTypes.func.isRequired,
};

export default InputAV;