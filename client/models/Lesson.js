import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
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
          enum: ['user', 'mentor'],
        },
        type: { type: String, required: true },
        text: { type: String, required: true },
        translatedAnswer: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema); 