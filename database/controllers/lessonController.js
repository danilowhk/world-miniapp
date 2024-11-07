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

const listLessons = async (_, res) => {
  try {
    const lessons = await Lesson.find();
    res.status(200).json(lessons);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listLessonsByUserSub = async (req, res) => {
  const { sub } = req.body;
  
  try {
    const lessons = await Lesson.find({ userAuthSub: sub });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findLessonById = async (req, res) => {
  const { id } = req.params;
  try {
    const lesson = await Lesson.findById(id);
    if (lesson) {
      res.status(200).json(lesson);
    } else {
      res.status(404).json({ message: "Lesson not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addMessageToLesson = async (req, res) => {
  const { id } = req.params;
  const { author, type, text, timestamp, translatedAnswer, languageTip, languageCompliment, score } = req.body;

  try {
    const lesson = await Lesson.findById(id);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    const newMessage = {
      author,
      type,
      text,
      translatedAnswer,
      languageTip,
      languageCompliment,
      score,
      timestamp: new Date(timestamp)
    };

    lesson.content.push(newMessage);

    await lesson.save();

    res.status(200).json(lesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createLesson, listLessons, listLessonsByUserSub, findLessonById, addMessageToLesson };
