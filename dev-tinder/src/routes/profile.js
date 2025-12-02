const express = require('express');
const { userAuth } = require("../middlewares/auth");
const { validateEditProfiledata } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } 
  catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) =>{
    try {
        if(!validateEditProfiledata(req)){
            throw new Error("Invalid edit request!");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        });
        await loggedInUser.save();
        res.json({
            message: "Profile updated successfully!",
            user: loggedInUser,
        });
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = profileRouter;