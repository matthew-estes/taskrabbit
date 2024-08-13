const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const isSignedIn = require("../middleware/is-signed-in.js");
const authController = require("../controllers/auth.js");

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send("Username already taken.");
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password and Confirm Password must match");
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body);

    req.session.user = {
      username: newUser.username,
      _id: newUser._id,
    };

    res.redirect(`/users/${newUser._id}/tasks`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});

router.post("/sign-in", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send("Login failed. Please try again.");
    }

    const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password);
    if (!validPassword) {
      return res.send("Login failed. Please try again.");
    }

    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
    };

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/sign-out", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.get("/reset", isSignedIn, authController.showPwReset);
router.post("/reset", isSignedIn, authController.resetPw);

module.exports = router;
