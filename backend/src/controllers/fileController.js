const path = require("path");

const uploadFile = (req, res) => {
  const { filename, path: filepath, mimetype } = req.file;
  const db = req.db;

  db.run(
    `INSERT INTO files (filename, filepath, mimetype) VALUES (?, ?, ?)`,
    [filename, filepath, mimetype],
    function (err) {
      if (err) return res.status(500).json({ message: "Database error." });
      res.status(201).json({ id: this.lastID, filename, filepath });
    }
  );
};

const getAllFiles = (req, res) => {
  const db = req.db;

  db.all(`SELECT * FROM files`, [], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error." });
    res.json(rows);
  });
};

const getFileById = (req, res) => {
  const { id } = req.params;
  const db = req.db;

  db.get(`SELECT * FROM files WHERE id = ?`, [id], (err, file) => {
    if (err || !file)
      return res.status(404).json({ message: "File not found." });
    res.sendFile(path.resolve(file.filepath));
  });
};

module.exports = {
  uploadFile,
  getAllFiles,
  getFileById,
};
