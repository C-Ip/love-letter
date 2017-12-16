var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('game', {title: 'Game Room', user: req.user });
});

router.post('/', (request, response, next) => {
  response.redirect('/game');
});
module.exports = router;
