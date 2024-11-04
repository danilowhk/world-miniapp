// utils/createIndexes.js
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");
const Lesson = require("../models/Lesson");

connectDB().then(async () => {
  try {
    await User.createIndexes({ email: 1 });
    await Lesson.createIndexes({ userId: 1 });
    console.log("Indexes created successfully");
  } catch (error) {
    console.error("Error creating indexes:", error);
  } finally {
    mongoose.connection.close();
  }
});
