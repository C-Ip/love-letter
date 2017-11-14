var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (request, respond) => {
  respond.render('registration', { title: 'Registration Page' });
});

module.exports = router;
