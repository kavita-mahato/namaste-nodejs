const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

// POST signup - Create a new user
app.post("/signup", async (req, res) => {
  try{
    // Validate the incoming data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password, gender, about } = req.body;

    // Encrypt the password before saving
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      gender,
      about,
    });

    await user.save();
    res.send("User Added successfully!");
  }
  catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// Login API - Authenticate user
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {

      // Generate token
      const token = jwt.sign({ _id: user._id }, "DEV@Tinder$790", { expiresIn: "1d" });

      // Add the token to Cookie
      res.cookie("token", token, { expires: new Date(Date.now() + 3600) });

      res.send("Login Successful!!!");
    } 
    else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// GET profile - Get user profile using token from cookies
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } 
  catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// API to send connection request
app.post("/sendConnectionRequest", userAuth, async(req, res) => {
  try{
    const user = req.user;
    console.log("Sending connection request");
    res.send(user.firstName +" " + user.lastName + " sent connection request!");
  }
  catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
});

// Connect to database first, then start server
connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is listening on port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
    process.exit(1);
  });