const express = require("express");
const connectDB = require("./config/database");
const app = express();

// Connect to database first, then start server
connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
    process.exit(1);
  });