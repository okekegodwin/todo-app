const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Todo", TodoSchema);