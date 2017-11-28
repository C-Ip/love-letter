var express = require('express');
var router = express.Router();
var db = require('../db');
/* GET users listing. */
router.get('/', (req, res) => {
  res.send('Game Page');
});

router.post('/', (request, response) => {
  console.log('POST request on /game');
  db.one('SELECT * FROM game WHERE gameid = $1', ['1'])
  .then(data => {
    response.redirect('/game');
  })
});
module.exports = router;
