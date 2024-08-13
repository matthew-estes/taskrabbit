const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  priority: {
    type: String,
    enum: ["High", "Low"],
  },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed", "On Hold"],
    required: true,
  },
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
