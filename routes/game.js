var express = require('express');
var router = express.Router();
var db = require('../db');
/* GET users listing. */
router.get('/', (req, res) => {
  res.send('Game Page');
});

module.exports = router;
