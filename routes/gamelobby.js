var express = require('express');
var router = express.Router();
var db = require('../models/index');

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('gamelobby', {title: 'Game Lobby Page', user: req.user });
});

router.post('/', (request, response, next) => {
  db.createRoom()
  .then( data => {
    db.firstToJoinRoom(request.user.playerid, data.gameid)
    .then( data => {
      response.redirect('/gamelobby');
    })
  })
});

module.exports = router;
