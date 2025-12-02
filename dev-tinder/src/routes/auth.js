const express = require('express');
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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
      res.cookie("token", token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });

      res.send("Login Successful!!!");
    } 
    else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successful!!!");
});

module.exports = authRouter;