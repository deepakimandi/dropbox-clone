import React, { useState } from "react";
import { uploadFile } from "../api/index";
import { Button, TextField, Typography, LinearProgress } from "@mui/material";

const FileUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadFile(formData, (event) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      });
      setError("");
      setFile(null);
      setProgress(0);
      setUploading(false);
      onUpload();
    } catch (err) {
      setError("File upload failed");
      setUploading(false);
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Typography variant="h6">Upload a File</Typography>
      <TextField
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        variant="outlined"
        fullWidth
      />
      {error && <Typography color="error">{error}</Typography>}
      {uploading && (
        <LinearProgress
          variant="determinate"
          value={progress}
          style={{ margin: "10px 0" }}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        style={{ marginTop: "10px" }}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
};

export default FileUploader;
