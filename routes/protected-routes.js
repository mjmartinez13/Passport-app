const express = require('express');
const ensureLogin = require('connect-ensure-login');
const protRoutes = express.Router();



protRoutes.get('/secret', (req, res, next) => {
    res.send('SHHHHHH its a secret');
});

protRoutes.get('/kgb-files', (req, res) => {
  res.send('In Soviet Rusia, files store you');
});

module.exports = protRoutes;
