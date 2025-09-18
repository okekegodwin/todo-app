const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");
const user = require("../services/auth.service");
const { hashPassword } = require("../utils/hashPassword.utils")

router.post("/signup", hashPassword, user.createUser, controller.signup);
router.post("/login", user.findUserByUsername, auth.verifyPassword, controller.login);
router.post("/logout", controller.logout);
 
module.exports = router;