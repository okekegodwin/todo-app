const express = require("express");
const router = express.Router();

const controller = require("../controllers/todo.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth.isLoggedIn, controller.createTodo);
router.get("/", auth.isLoggedIn, controller.getAllTodos);
router.get("/:todoId", auth.isLoggedIn, controller.getOneTodo);
router.get("/date/:date", auth.isLoggedIn, controller.getTodosByDate);
router.put("/:todoId", auth.isLoggedIn, controller.updateTodo);
router.delete("/:todoId", auth.isLoggedIn, controller.deleteTodo);

module.exports = router;