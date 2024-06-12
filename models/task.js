const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  isHighPriority: { type: Boolean, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed", "On Hold", "Cancelled"],
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
