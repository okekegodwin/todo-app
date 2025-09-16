const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const user = require("../middlewares/user.middleware");

router.post("/signup", auth.hashPassword, user.createUser, controller.signup);
router.post("/login", user.findUserByUsername, auth.verifyPassword, controller.login);

module.exports = router;