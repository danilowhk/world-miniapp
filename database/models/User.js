// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    authSub: { type: String, required: true, unique: true },
    coins: { type: Number, default: 0 },
    interests: [{ type: String }],
    nativeLanguage: { type: String, required: true },
    learningLanguage: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    progress: {
      vocabulary: { type: Number, default: 0 },
      lessonsCompleted: { type: Number, default: 0 },
      dailyStreak: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
