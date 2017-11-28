var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('game', {title: 'Game Room'});
});

module.exports = router;
