const express =  require('express');
const ensure = require('connect-ensure-login');
const Room = require('../models/room-model.js');
const multer = require('multer');

const roomsRoutes = express.Router();
const uploads = multer({ dest: __dirname + '/../public/uploads/'});

roomsRoutes.get('/my-rooms', ensure.ensureLoggedIn(), (req, res, next) => {
  Room.find({ owner: req.user._id}, (err, myRooms) => {
    if (err) {
      next(err);
      return;
    }
    res.render('rooms/rooms-index.ejs', { rooms: myRooms});
  });
});

roomsRoutes.get('/rooms/new', ensure.ensureLoggedIn(), (req, res, next) => {
  res.render('rooms/new.ejs', {
    message: req.flash('success')
  });
});
roomsRoutes.post('/rooms',
ensure.ensureLoggedIn(),
//<input id="picture-input" type="file" name="picture">
//                                              |
//                 ------------------------------
//                 |
uploads.single('picture'),

(req, res, next) => {
  const filename = req.file.filename;

  const newRoom = new Room ({
    name:  req.body.name,
    desc:  req.body.desc,
    picture: `/uploads/${filename}`,
    owner: req.user._id
  });

  newRoom.save ((err) => {
    if (err) { return next(err); }
    else {
      req.flash('success', 'Your room has been created.');
      res.redirect('/rooms/new');
    }
  });
});

module.exports = roomsRoutes;
