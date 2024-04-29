import React, { useState } from "react";
import PropTypes from 'prop-types';
import BrowseButton from "../atoms/BrowseButton";
import SupportFormatText from "../atoms/SupportFormatText"

import { formatFormats } from '../../common/formatters';
import "../../App.css"

function DragDropFiles({ formats, onUploaded }) {

  // CONSTANTS
  const formatString = formatFormats( formats );

  // STATES
  const [dragActive, setDragActive] = useState(false);
  
  // HANDLERS
  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // at least one file has been selected so do something
      // handleFiles(e.target.files);
    }
  };


  return (
    <form 
      id="form-file-upload"
      onDragEnter={ handleDrag } 
      onDrop={ handleDrop }
      onChange={ handleChange }
      onSubmit={ (e) => e.preventDefault() }>
      <input 
        type="file" 
        id="input-file-upload" 
        multiple={true} 
        accept={ formatString }/>
      <label 
        id="label-file-upload" 
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : "" }>
        <div>
          <p>Drag and drop your file here or</p>
          < BrowseButton />
          <SupportFormatText 
            formats={ formats }/>
        </div>
      </label>
    </form>
  );
};

DragDropFiles.propTypes = {
    formats: PropTypes.arrayOf(PropTypes.string).isRequired,
    onUploaded: PropTypes.func.isRequired,
}

  export default DragDropFiles;

// Source: https://www.codemzy.com/blog/react-drag-drop-file-upload