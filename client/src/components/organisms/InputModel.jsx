import React from "react";
import PropTypes from 'prop-types';

import DragDropFiles from "../molecules/DragDropFiles";

function InputModel({ 
    onUploaded,
}) {

    const formats = ["pt"];

    return (
        < DragDropFiles 
            type="model"
            formats={ formats } 
            onUploaded={ onUploaded } 
            uploadMultiple={ false }/>
    );
}

InputModel.propTypes = {
    onUploaded: PropTypes.func.isRequired,
};

export default InputModel;