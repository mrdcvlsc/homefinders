import React from "react";

import "../styles/UploadDragOrSelect.css";

export default function UploadDragOrSelect() {
  const [files, setFiles] = React.useState(null);
  const inputRef = React.useRef();

  const handleDrag = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles(e.dataTransfer.files);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log("Uploading files :");
    console.log(files);
    console.log();

    const selectedFiles = new FormData();

    for (const file of files) {
      selectedFiles.append("files[]", file, file.name);
    }

    console.log('selectedFiles = ')
    console.log(selectedFiles)

    try {
      const response = await fetch('/upload', {
        credentials: "include",
        method: "POST",
        body: selectedFiles
      })

      const data = await response.json();
      console.log('fetched data = ')
      console.log(data)
    } catch(err) {
      console.log('upload try catch error = ')
      console.error(err)
    }
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

          <button onClick={() => inputRef.current.click()}>Select Files</button>
        </div>
      ) : (
        <div className="dropbox">
          <ul className="files-selected">
            {Array.from(files).map(function (file, idx) {
              return <li key={idx}>{file.name}</li>;
            })}
          </ul>

          <div className="upload-selection-buttons">
            <button onClick={(e) => handleUpload(e)}>Upload</button>

            <button onClick={() => setFiles(null)}>Clear</button>
          </div>
        </div>
      )}
    </>
  );
}
