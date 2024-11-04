// controllers/lessonController.js
const Lesson = require("../models/Lesson");

const createLesson = async (req, res) => {
  try {
    const newLesson = new Lesson(req.body);
    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createLesson };
