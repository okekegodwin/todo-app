const Todo = require("../models/todo.model");

exports.createTask = async (input, userId) => {
  if (Array.isArray(input)) {
    const todoWithUserId = input.map(todo => ({
      ...todo,
      userId: userId
    }))
    
    return await Todo.insertMany(todoWithUserId);

  } else {
    const todo = new Todo({
      ...input,
      userId: userId
    })

    return await todo.save();
  }
}

exports.getAllTasks = async (userId) => {
  return await Todo.find({ userId });
}

exports.getOneTask = async (todoId, userId) => {
  return await Todo.findById(todoId);
}

exports.getTaskByDate = async (userId, startOfDay, endOfDay) => {
  return await Todo.find({
    userId,
    dueDate: {
      $gte: startOfDay,
      $lte: endOfDay
    }
  })
}

exports.updateTask = async (todoId, updates) => {
  return await Todo.findByIdAndUpdate(todoId, updates, { new: true });
}

exports.deleteTask = async (todoId) => {
  return await Todo.findByIdAndDelete(todoId);
}