import React from "react";
import PropTypes from 'prop-types';

import DragDropFiles from "../molecules/DragDropFile";

function InputModel({ onUploaded }) {

    const formats = [".pt"];

    return (
        < DragDropFiles 
            formats={ formats } 
            onUploaded={ onUploaded } />
    );
}

InputModel.propTypes = {
    onUploaded: PropTypes.func.isRequired,
};

export default InputModel;