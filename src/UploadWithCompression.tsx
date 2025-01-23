import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { setCompressedFile, setOriginalFile } from "./fileSlice"; // Adjust path as needed
import { AppDispatch, RootState } from "./store";
import { useNavigate } from "react-router-dom";

const UploadWithCompression: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const compressedFile = useSelector(
    (state: RootState) => state.file.compressedFile
  );

  const originalFile = useSelector(
    (state: RootState) => state.file.originalFile
  );
  const handleDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    const originalbase64 = await imageCompression.getDataUrlFromFile(file);
    dispatch(setOriginalFile(originalbase64));
    const options = {
      maxSizeMB: 1, // Maximum size in MB
      maxWidthOrHeight: 800, // Maximum width or height
      useWebWorker: true, // Use a web worker for faster compression
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const base64 = await imageCompression.getDataUrlFromFile(compressedFile);

      console.log(
        "%cimage-upload-compression/src/UploadWithCompression.tsx:28 compressedFile, base64",
        "color: #007acc;",
        compressedFile,
        base64
      );
      dispatch(setCompressedFile(base64)); // Store compressed file as base64
      console.log("Dispatched base64 image:", originalbase64, base64);
    } catch (error) {
      console.error("Image compression error:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/*": [], // Accepts all image types
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        style={{ border: "2px dashed #ccc", padding: "20px" }}
      >
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
      </div>

      {originalFile ? (
        <div style={{ maxWidth: "100vw" }}>
          <p>Uncompressed File</p>
          <img
            style={{ maxWidth: "100vw" }}
            src={originalFile}
            alt="UnCompressed Upload"
          />
        </div>
      ) : (
        <p>No image uploaded.</p>
      )}

      {compressedFile ? (
        <>
          <p>Compressed File</p>
          <img src={compressedFile} alt="Compressed Upload" />
        </>
      ) : (
        <p>No image uploaded.</p>
      )}
    </>
  );
};

export default UploadWithCompression;
