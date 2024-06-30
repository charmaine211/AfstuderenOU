import React from "react";
import PropTypes from 'prop-types';

import DragDropFiles from "../molecules/DragDropFiles";

import {AV_FORMATS } from "../../config";

function InputAV({ 
    onUploaded,
}) {

    return (
        < DragDropFiles 
            formats={ AV_FORMATS } 
            onUploaded={ onUploaded } 
            uploadMultiple={ true }/>
    );
}

InputAV.propTypes = {
    onUploaded: PropTypes.func.isRequired,
};

export default InputAV;