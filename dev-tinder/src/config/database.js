const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection established...");
    return true;
  } 
  catch (error) {
    console.error("Database cannot be connected!!");
    console.error("Error details: ", error.message);
    throw error;
  }
};

module.exports = connectDB;