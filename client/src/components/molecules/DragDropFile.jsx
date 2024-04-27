import React from "react";
import PropTypes from 'prop-types';
import BrowseButton from "../atoms/BrowseButton";
import SupportFormatText from "../atoms/SupportFormatText"

function DragDropFiles({formats}) {

  return (
    <form id="form-file-upload">
      <input type="file" id="input-file-upload" multiple={true} />
      <label id="label-file-upload" htmlFor="input-file-upload">
        <div>
          <p>Drag and drop your file here or</p>
          < BrowseButton />
          <SupportFormatText formats={formats}/>
        </div>
      </label>
    </form>
  );
};

DragDropFiles.propTypes = {
    formats: PropTypes.arrayOf(PropTypes.string).isRequired,
}

  export default DragDropFiles;

// Source: https://www.codemzy.com/blog/react-drag-drop-file-upload