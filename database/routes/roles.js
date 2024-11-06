// routes/roles.js
const express = require("express");
const { createRole, listRoles, findRoleById, updateRole } = require("../controllers/roleController");

const router = express.Router();

router.post("/", createRole);
router.get("/", listRoles);
router.get("/:id", findRoleById);
router.patch("/:id", updateRole);

module.exports = router;
