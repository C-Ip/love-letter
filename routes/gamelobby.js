var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('gamelobby', {title: 'Game Lobby Page'});
});

router.post('/', (request, response, next) => {
  if(request.session.player_id == null) {
    response.redirect('/login');
  } 
  else {
    db.one('INSERT INTO game(playerturn) VALUES($1) RETURNING gameid', ['0'])
    .then( data => {
      console.log("Room created");
      console.log(data.gameid);
      var gameRoomId = data.gameid;
      console.log(request.session.player_id);
      db.none('INSERT INTO playergame(playerid, gameid) VALUES($1, $2)', [request.session.player_id, gameRoomId])
      .then( data => {
        console.log("Player added to game lobby");
        response.redirect('/gamelobby');
      })
    })
  }
});

module.exports = router;
