// routes/users.js
const express = require("express");
const { createUser, listUsers, findUserBySub, updateUser } = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/", listUsers);
router.get("/:sub", findUserBySub);
router.patch("/:sub", updateUser);


module.exports = router;
