import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store"; // Adjust path

const DisplayCompressedImage: React.FC = () => {
  const compressedFile = useSelector(
    (state: RootState) => state.file.compressedFile
  );
  const compressedFileState = useSelector((state: RootState) => state.file);
  console.log(
    "%cimage-upload-compression/src/DisplayCompressedImage.tsx:9 compressedFile",
    "color: #007acc;",
    compressedFile,
    compressedFileState
  );
  return (
    <div>
      <h1>Compressed Image Preview</h1>
      {compressedFile ? (
        <img
          src={compressedFile}
          alt="Compressed Upload"
          style={{ width: "300px" }}
        />
      ) : (
        <p>No image uploaded.</p>
      )}
    </div>
  );
};

export default DisplayCompressedImage;
