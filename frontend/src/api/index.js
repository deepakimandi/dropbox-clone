import axios from "axios";

const BASEURL = "http://localhost:5000/api";
const API = axios.create({ baseURL: BASEURL });

export const uploadFile = (formData) => API.post("/upload", formData);
export const fetchFiles = () => API.get("/files");
export const downloadFile = (id) =>
  API.get(`/files/${id}`, { responseType: "blob" });
export const getFileURL = (id) => `${BASEURL}/files/${id}`;
