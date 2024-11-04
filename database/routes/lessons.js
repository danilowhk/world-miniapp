// routes/lessons.js
const express = require("express");
const { createLesson } = require("../controllers/lessonController");

const router = express.Router();

router.post("/", createLesson);

module.exports = router;
