import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchFiles } from "./api/index";
import FileUploader from "./components/FileUploader";
import FileList from "./components/FileList";
import ViewFile from "./pages/ViewFile";
import { Container, Typography } from "@mui/material";

const App = () => {
  const [files, setFiles] = useState([]);

  const loadFiles = async () => {
    const { data } = await fetchFiles();
    setFiles(data);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <Router>
      <Container>
        <Typography variant="h3" style={{ marginTop: "20px" }}>
          Dropbox
        </Typography>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <FileUploader onUpload={loadFiles} />
                <FileList files={files} />
              </>
            }
          />
          <Route path="/view/:id" element={<ViewFile />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
