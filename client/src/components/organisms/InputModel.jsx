import React from "react";
import PropTypes from 'prop-types';

import DragDropFiles from "../molecules/DragDropFiles";

import { MODEL_FORMATS } from "../../config";

function InputModel({ 
    onUploaded,
}) {

    return (
        < DragDropFiles 
            type="model"
            formats={ MODEL_FORMATS } 
            onUploaded={ onUploaded } 
            uploadMultiple={ false }/>
    );
}

InputModel.propTypes = {
    onUploaded: PropTypes.func.isRequired,
};

export default InputModel;