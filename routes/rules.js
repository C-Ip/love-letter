var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('rules', { title: 'Game Rules' });
});

module.exports = router;
