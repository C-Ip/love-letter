var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET users listing. */
router.get('/', (request, respond) => {
  respond.render('login', { title: 'Login' });
});

router.post('/', (request, respond) => {
  console.log('POST request on /login');
  const confirm = '';

  db.any(confirm);
});

module.exports = router;
