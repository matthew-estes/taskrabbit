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

function newTaskForm(req, res){
    res.render('tasks/new.ejs')
}

module.exports = {
  index,
  new: newTaskForm,
};
