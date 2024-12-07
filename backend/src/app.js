const express = require("express");
const path = require("path");
const cors = require("cors");
const fileRoutes = require("./routes/fileRoutes");
const dbMiddleware = require("./middlewares/dbMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(dbMiddleware);

// Routes
app.use("/api", fileRoutes);

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
