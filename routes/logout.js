var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
  request.logout();
  console.log("You logged out");
  response.redirect('/login');
});

module.exports = router;
