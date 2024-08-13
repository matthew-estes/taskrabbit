const User = require("../models/user");

function newTaskForm(req, res) {
  res.render("tasks/new.ejs");
}

async function index(req, res) {
  try {
    const user = await User.findById(req.session.user._id);
    res.render("tasks/index.ejs", {
      tasks: user.tasks,
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.redirect("/");
  }
}

async function show(req, res) {
  try {
    const user = await User.findById(req.session.user._id);
    const task = user.tasks.id(req.params.taskId);
    res.render("tasks/show.ejs", { task });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.redirect("/");
  }
}

async function create(req, res) {
  try {
    const foundUser = await User.findById(req.session.user._id);

    const newTask = {
      name: req.body.name,
      description: req.body.description || "",
      category: req.body.category,
      priority: req.body.priority || "Low",
      dueDate: req.body.dueDate,
      status: req.body.status,
    };

    foundUser.tasks.push(newTask);
    await foundUser.save();

    res.redirect(`/users/${foundUser._id}/tasks`);
  } catch (error) {
    console.error("Error creating task:", error);
    res.redirect("/");
  }
}

async function edit(req, res) {
  try {
    const user = await User.findById(req.session.user._id);
    const task = user.tasks.id(req.params.taskId);
    res.render("tasks/edit.ejs", { task });
  } catch (error) {
    console.error("Error fetching task for edit:", error);
    res.redirect("/");
  }
}

async function update(req, res) {
  try {
    const user = await User.findById(req.session.user._id);
    const task = user.tasks.id(req.params.taskId);
    task.set(req.body);
    await user.save();
    res.redirect(`/users/${user_id}/tasks/${req.params.taskId}`);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
}

async function deleteTask(req, res) {
  try {
    const user = await User.findById(req.session.user._id);
    user.tasks.pull({ _id: req.params.taskId });
    await user.save();
    res.redirect(`/users/${user._id}/tasks`);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.redirect("/");
  }
}

module.exports = {
  new: newTaskForm,
  index,
  show,
  create,
  edit,
  update,
  delete: deleteTask,
};
