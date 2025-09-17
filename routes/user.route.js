const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const user = require("../services/user.service");
const { hashPassword } = require("../utils/hashPassword.utils")

router.post("/signup", hashPassword, user.createUser, controller.signup);
router.post("/login", user.findUserByUsername, auth.verifyPassword, controller.login);

module.exports = router;