const User = require("../models/user");

async function index(req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    console.log(currentUser);
    res.render("tasks/index.ejs", {
      tasks: currentUser.tasks,
    });
  } catch (err) {
    res.redirect("/");
  }
}

function newTaskForm(req, res) {
  res.render("tasks/new.ejs");
}

async function create(req, res) {
  try {
    console.log(req.session.user);
    const foundUser = await User.findById(req.session.user._id);
    foundUser.tasks.push(req.body);
    await foundUser.save();
    res.redirect(`/users/${foundUser._id}/tasks`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function show(req, res){
    try {
        const currentUser = await User.findById(req.session.user._id);
        const task = currentUser.tasks.id(req.params.taskId);
        res.render('tasks/show.ejs', { task });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}


module.exports = {
  index,
  new: newTaskForm,
  create,
  show,
};
