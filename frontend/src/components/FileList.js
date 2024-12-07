import React from "react";
import { useNavigate } from "react-router-dom";
import { downloadFile } from "../api/index";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
const FileList = ({ files }) => {
  const navigate = useNavigate();
  const handleDownload = async (id, filename) => {
    const res = await downloadFile(id);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  };
  const handleView = (id) => {
    navigate(`/view/${id}`);
  };
  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      {" "}
      <Table>
        {" "}
        <TableHead>
          {" "}
          <TableRow>
            {" "}
            <TableCell>File Name</TableCell> <TableCell>Actions</TableCell>{" "}
          </TableRow>{" "}
        </TableHead>{" "}
        <TableBody>
          {" "}
          {files.map((file) => (
            <TableRow key={file.id}>
              {" "}
              <TableCell>{file.filename}</TableCell>{" "}
              <TableCell>
                {" "}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleView(file.id)}
                  style={{ marginRight: "10px" }}
                >
                  {" "}
                  View{" "}
                </Button>{" "}
                <Button
                  variant="contained"
                  onClick={() => handleDownload(file.id, file.filename)}
                >
                  {" "}
                  Download{" "}
                </Button>{" "}
              </TableCell>{" "}
            </TableRow>
          ))}{" "}
        </TableBody>{" "}
      </Table>{" "}
    </TableContainer>
  );
};
export default FileList;
