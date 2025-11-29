const express = require("express");
const app = express();

app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your error
    res.status(500).send("something went wrong");
  }
});

app.get("/getUserData", (req, res) => {
  //try {
  // Logic of DB call and get user data
  throw new Error("dvbzhjf");
  res.send("User Data Sent");
  //   } catch (err) {
  //     res.status(500).send("Some Error contact support team");
  //   }
});

// Error handling middleware should be defined at the end of all routes and middlewares
// because it will catch errors from them
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});