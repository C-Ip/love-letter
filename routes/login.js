var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (request, respond) => {
  respond.render('login', { title: 'Login' });
});

module.exports = router;
