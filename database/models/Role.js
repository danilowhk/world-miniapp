const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    mentor: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ["basic", "medium", "advanced"] },
    prompt: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);