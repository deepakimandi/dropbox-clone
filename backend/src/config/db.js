const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT,
        filepath TEXT,
        mimetype TEXT
      )`
    );
  }
});

module.exports = db;
