import React, { useState } from "react";
import PropTypes from 'prop-types';
import BrowseButton from "../atoms/BrowseButton";
import SupportFormatText from "../atoms/SupportFormatText"

import { formatFileFormats } from '../../common/utils/formatters';

function DragDropFiles({
  type,
  formats,
  onUploaded,
  uploadMultiple,
}) {

  // CONSTANTS
  const fileFormatString = formatFileFormats(formats);
  const backgroundImage = formats.includes(".pt") ?
    "../../../assets/brain-background.png" :
    "../../../assets/photo-film-background.png";

  // STATES
  const [dragActive, setDragActive] = useState(false);

  // HANDLERS
  const handleFiles = (files) => {
    let filePaths = [];

    for (var i = 0; i < files.length; i++) {
      alert(JSON.stringify(files[i]));
      filePaths.push(files[i].path);
    }
    alert(JSON.stringify(files));
    // onUploaded(filePaths);
  }

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // at least one file has been selected so do something
      handleFiles(e.target.files);
    }
  };


  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onDrop={handleDrop}
      onChange={handleChange}
      onSubmit={(e) => e.preventDefault()
      }
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
      }} >
      <input
        type="file"
        id="input-file-upload"
        multiple={uploadMultiple}
        accept={fileFormatString} />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}>
        <div className="form-content">
          <p>Drag and drop your {type} here or</p>
          <div className="buttons">
            <BrowseButton
              formats={fileFormatString} />
          </div>
          <SupportFormatText
            formats={formats} className="support-text" />
        </div>
      </label>
    </form>

  );
};

DragDropFiles.propTypes = {
  formats: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUploaded: PropTypes.func.isRequired,
  type: PropTypes.string,
  uploadMultiple: PropTypes.bool.isRequired,
}

DragDropFiles.defaultProps = {
  type: "file(s)"
};

export default DragDropFiles;

// Source: https://www.codemzy.com/blog/react-drag-drop-file-upload
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader
// https://medium.com/sopra-steria-norge/build-a-simple-image-classification-app-using-react-keras-and-flask-7b9075e3b6f5