var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (request, response) => {
  response.render('user', { title: 'Account Page', user: request.user });
});


module.exports = router;
