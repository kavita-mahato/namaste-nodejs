const express = require("express");
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("User logged in successfully!");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("User Data Sent"); // If userAuth passes, this will be executed
});

app.get("/admin/getAllData", adminAuth, (req, res) => {
  res.send("All Data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});