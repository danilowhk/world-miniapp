// models/Lesson.js
const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    userAuthSub: {
      type: String,
      ref: "User",
      required: true,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    mentor: { type: String, required: true },
    content: [
      {
        author: {
          type: String,
          required: true,
          enum: ['user', 'mentor'],  // Restrict to either 'user' or 'mentor'
        },
        type: { type: String, required: true },
        text: { type: String, required: true },
        translatedAnswer: { type: String },
        languageTip: { type: String },
        languageCompliment: { type: String },
        score: { type: Number },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    difficulty: { type: String, required: true },
    userInterest: [
      {
        interest: { type: String },
      },
    ],
    userLessonType: { type: String },
    userScore: { type: Number },
    personalityType: { type: String },
    nativeLanguage: { type: String },
    learningLanguage: { type: String },
    createdAt: { type: Date, default: Date.now },
    lifetime: { type: Number, default: 60 * 3 }, // 180 seconds
    completedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);
