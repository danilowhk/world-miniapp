// createUser.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../../config/db");
const User = require("../../models/User");

dotenv.config();
connectDB();

const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    console.log("User created successfully:", user);
  } catch (error) {
    console.error("Error creating user:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

// Replace the below data with the user information you want to add
const newUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  coins: 10,
  interests: ["learning", "technology"],
  nativeLanguage: "English",
  learningLanguage: "Spanish",
  progress: {
    vocabulary: 100,
    lessonsCompleted: 5,
    dailyStreak: 3,
  },
};

createUser(newUser);
