const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from cookies
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const decodedObj = await jwt.verify(token, "DEV@Tinder$790"); // verify token

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not exist");
    }

    req.user = user;
    next(); // to move to the req handler
  }
  catch (err) {
    res.status(401).send("Unauthorized : " + err.message);
  }
};

module.exports = {
  userAuth,
};