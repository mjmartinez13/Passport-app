const express    = require("express");
const authRoutes = express.Router();

// User model
const User       = require("../models/user-model.js");

// Bcrypt to encrypt passwords
const bcrypt     = require("bcrypt");

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup-view.ejs");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup-view.ejs", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup-view.ejs", { message: "The username already exists" });
      return;
    }

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: username,
      encryptedPassword: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup-view.ejs", { message: "Something went wrong" });
      } else {
        req.flash('success', 'You have been registered. Try loggin in.');
        res.redirect("/");
      }
    });
  });
});


const passport = require('passport');

authRoutes.get('/login', (req, res, next) => {
  res.render('auth/login-view.ejs', {
    errorMessage: req.flash('error')
  });
});


authRoutes.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: 'You have been logged in, user!',
    passReqToCallback: true
  })
);

//LOG OUT
authRoutes.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have been logged out');
  res.redirect('/');
});


module.exports = authRoutes;
