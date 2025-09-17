const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/:userId", controller.fetchProfile);
router.put("/:userId", auth.isLoggedIn, controller.updateProfile);
router.delete("/:userId", auth.isLoggedIn, controller.deleteProfile);

module.exports = router;