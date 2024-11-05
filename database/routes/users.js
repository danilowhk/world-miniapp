// routes/users.js
const express = require("express");
const { createUser, listUsers, findUserById, updateUser } = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/", listUsers);
router.get("/:id", findUserById);
router.patch("/:id", updateUser);


module.exports = router;
