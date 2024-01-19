import React from "react";

import "../styles/UploadDragOrSelect.css";

export default function UploadDragOrSelect({ files, setFiles }) {
  const inputRef = React.useRef();

  const handleDrag = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles(e.dataTransfer.files);
  };

  return (
    <>
      {!files ? (
        <div
          className="dropbox"
          onDragOver={(e) => handleDrag(e)}
          onDrop={(e) => handleDrop(e)}
        >
          <h4>Drag and Drop files to upload</h4>
          <h5>or</h5>

          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            hidden
            ref={inputRef}
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              inputRef.current.click();
            }}
          >
            Select Files
          </button>
        </div>
      ) : (
        <div className="dropbox">
          <ul className="files-selected">
            {Array.from(files).map(function (file, idx) {
              return <li key={idx}>{file.name}</li>;
            })}
          </ul>

          <div className="upload-selection-buttons">
            <button onClick={() => setFiles(null)}>Clear</button>
          </div>
        </div>
      )}
    </>
  );
}
