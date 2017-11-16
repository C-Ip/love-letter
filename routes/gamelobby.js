var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('gamelobby', {title: 'Game Lobby Page'});
});

module.exports = router;
