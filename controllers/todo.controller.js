const todoService = require("../services/todo.service");

exports.createTodo = async (req, res) => {
  try {
    const input = req.body;

    if (!input || (typeof input === "object" && Object.keys(input).length === 0)) {
        return res.status(400).json({ message: "Request body cannot be empty" });
    }

    if (Array.isArray(input)) {
      if (input.length === 0) {
        return res.status(400).json({ message: "Invalid input: Empty array provided" });
      }

      const todos = await todoService.createTask(input, req.session.user.id);
      return res.status(201).json({ 
        message: "Task created successfully!",
        todos
      });
    } else {
      if (!input.title) {
        return res.status(400).json({ message: "Title required" });
      }

      const todo = await todoService.createTask(input, req.session.user.id);
      return res.status(201).json({ 
        message: "Task created successfully!",
        task: {
          title: todo.title,
          date: todo.dueDate
        }
      });
    }
  } catch (error) {
     res.status(500).json({ 
      message: "Error creating task",
      err: error.message
    })
  }
}

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTasks(req.session.user.id);

    if (!todos) {
      return res.status(400).json({ message: "No task found!" });
    }

    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
}

exports.getOneTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const todo = await todoService.getOneTask(todoId);

    if (!todo) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (todo.userId.toString() !== req.session.user.id.toString()) {
      return res.status(401).json({ message: "Unathorized!"});
    }

    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
}

exports.getTodosByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const todos = await todoService.getTaskByDate(req.session.user.id, startOfDay, endOfDay);

    if (todos.length === 0) {
      return res.status(404).json({ message: "No task found for this date" });
    }

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching tasks for the specified date",
      err: error.message
    });
  }
}

exports.updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const updates = req.body;

    const todo = await todoService.updateTask(todoId);

    if (!todo) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (todo.userId.toString() !== req.session.user.id.toString()) {
      res.status(401).json({ message: "Unathorized to update!"});
    }

    const updatedTodo = await todoService.updateTask(todoId, updates);
    res.status(201).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
}

exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const todo = await todoService.getOneTask(todoId);

    if (!todo) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (todo.userId.toString() !== req.session.user.id.toString()) {
      res.status(401).json({ message: "Unathorized!"});
    }

    await todoService.deleteTask(todoId);
    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
}