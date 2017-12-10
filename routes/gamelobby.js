var express = require('express');
var router = express.Router();
var db = require('../models/index');

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('gamelobby', {title: 'Game Lobby Page'});
});

router.post('/', (request, response, next) => {
  if(request.session.player_id == null) {
    response.redirect('/login');
  } else {
    db.createRoom()
    .then( data => {
      console.log(data.gameid);
      db.joinRoom(request, data.gameid)
      .then( data => {
        response.redirect('/gamelobby');
      })
    })
  }
});

module.exports = router;
