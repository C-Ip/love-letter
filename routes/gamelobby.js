var express = require('express');
var router = express.Router();
var db = require('../models/index');

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('gamelobby', {title: 'Game Lobby Page'});
});

router.post('/', (request, response, next) => {
  db.createRoom()
  .then( data => {
    db.joinRoom(request, data.gameid)
    .then( data => {
      response.redirect('/gamelobby');
    })
  })
});

module.exports = router;
