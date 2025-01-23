import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadWithCompression from "./UploadWithCompression";
import DisplayCompressedImage from "./DisplayCompressedImage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadWithCompression />} />
        <Route path="/display" element={<DisplayCompressedImage />} />
      </Routes>
    </Router>
  );
};

export default App;
