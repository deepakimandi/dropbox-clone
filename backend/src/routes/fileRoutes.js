const express = require("express");
const {
  uploadFile,
  getAllFiles,
  getFileById,
} = require("../controllers/fileController");
const upload = require("../utils/multerConfig");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/files", getAllFiles);
router.get("/files/:id", getFileById);

module.exports = router;
