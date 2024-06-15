const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");


async function showPwReset(req, res){
  res.render('auth/reset')
}

async function resetPw(req, res) {
  try {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.send("Password and Confirm Password must match")
  }
  const user = await User.findById(req.session.user._id);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    await user.save();
    res.redirect('/auth/sign-in');
  } catch (error) {
    console.log(error);
    return res.send ('Reset failed. Please try again.')
  }
};






module.exports = {
  showPwReset, 
  resetPw,
}
