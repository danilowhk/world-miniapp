// routes/users.js
const express = require("express");
const { createUser, listUsers, findUserById } = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/", listUsers);
router.get("/:id", findUserById);


module.exports = router;
