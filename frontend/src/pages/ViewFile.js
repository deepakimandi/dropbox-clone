import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFileURL, downloadFile } from "../api/index";
import { Typography, Paper, CircularProgress } from "@mui/material";

const ViewFile = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [fileType, setFileType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFile = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await downloadFile(id);
        const fileBlob = new Blob([res.data]);
        const mimeType = res.headers["content-type"];
        setFileType(mimeType);

        if (mimeType.startsWith("image/")) {
          const imageUrl = URL.createObjectURL(fileBlob);
          setContent(imageUrl);
        } else if (mimeType === "application/pdf") {
          setContent(getFileURL(id));
        } else if (mimeType.startsWith("text/")) {
          const text = await fileBlob.text();
          setContent(text);
        } else {
          throw new Error("Unsupported file type");
        }
      } catch (err) {
        console.error("Error fetching file:", err.message);
        setError("Failed to load file. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchFile();
  }, [id]);

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        File Viewer
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : fileType.startsWith("image/") ? (
        <img
          src={content}
          alt="Uploaded File"
          style={{ maxWidth: "100%", marginTop: "20px" }}
        />
      ) : fileType === "application/pdf" ? (
        <iframe
          src={content}
          style={{
            width: "100%",
            height: "800px",
            border: "none",
            marginTop: "20px",
          }}
          title="PDF Viewer"
        ></iframe>
      ) : (
        <Typography
          variant="body1"
          style={{
            marginTop: "20px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {content}
        </Typography>
      )}
    </Paper>
  );
};

export default ViewFile;
