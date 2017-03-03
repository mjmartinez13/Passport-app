const express = require('express');
const el = require('connect-ensure-login');
const protRoutes = express.Router();


//this is a ensurelogin------------|
protRoutes.get('/secret', el.ensureLoggedIn(), (req, res, next) => {
    res.send('SHHHHHH its a secret');
});

protRoutes.get('/kgb-files', (req, res) => {
  res.send('In Soviet Rusia, files store you');
});

module.exports = protRoutes;
