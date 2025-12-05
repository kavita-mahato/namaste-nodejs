const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

// Define safe user data fields to be returned
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId", USER_SAFE_DATA);
    // }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    req.statusCode(400).send("ERROR: " + err.message);
  }
});

// Get all the connections for the loggedIn user
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Define safe user data fields to be returned
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    console.log(connectionRequests);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Get user feed excluding users with pending/accepted connection requests
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Pagination parameters
    const page = parseInt(req.query.page) || 1; // Default to page 1
    let limit = parseInt(req.query.limit) || 10; // Number of users per page
    limit = limit > 50 ? 50 : limit; // Maximum limit of users per page
    const skip = (page - 1) * limit; // Number of users to skip

    // Fetch all connection requests involving the logged-in user
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    // Create a set of user IDs to hide from the feed
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      // Exclude users in hideUsersFromFeed and the logged-in user
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;