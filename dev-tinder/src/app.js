const express = require("express");

const app = express();

app.use("/test", (req, res) => {
    res.send("Hello from the server");
});

app.use("/hello", (req, res) => {
    res.send("Hello what's up!");
});

app.use("/", (req, res) => {
    res.send("Hello from the dashboard!");
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000...");
});