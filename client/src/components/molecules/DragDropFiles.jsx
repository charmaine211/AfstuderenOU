import React, { useState } from "react";
import PropTypes from 'prop-types';
import BrowseButton from "../atoms/BrowseButton";
import SupportFormatText from "../atoms/SupportFormatText";

import brainImage from "../../assets/brain-background.png";
import avImage from "../../assets/photo-film-background.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

import { formatFileFormats } from '../../common/utils/formatters';

function DragDropFiles({
  type= "file(s)",
  formats,
  onUploaded,
  uploadMultiple,
}) {
  // CONSTANTS
  const fileFormatString = formatFileFormats(formats);
  const backgroundImage = formats.includes("pt") ?
  brainImage : avImage;

  // STATES
  const [dragActive, setDragActive] = useState(false);

  // HANDLERS
  const handleFiles = (files) => {
    let filePaths = [];
    const acceptedFormats = formats.map(format => format.toLowerCase());
  
    Array.from(files).forEach(element => {
      const ext = element.name.split('.').pop().toLowerCase();
      if (acceptedFormats.includes(ext)) {
        filePaths.push(element.path);
      }
    });
  
    onUploaded(filePaths);
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onSubmit={(e) => e.preventDefault()}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <input
        type="file"
        id="input-file-upload"
        multiple={uploadMultiple}
        accept={fileFormatString}
        onChange={handleChange}
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <div className="form-content">
          <div style={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "25%",
            }}>
            {dragActive ? <p>Drop it like it's hot</p> : <p> Drag and drop your {type} here <br/> or </p>}
            <div className="buttons">
              {dragActive ? <FontAwesomeIcon icon={faFire} style={{fontSize: "5em", color: "#48A3C0" }}/>: <BrowseButton formats={ fileFormatString } onFileSelect={ handleFiles }/>}
            </div>
          </div>
          <SupportFormatText formats={formats} className="support-text" />
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

export default DragDropFiles;
