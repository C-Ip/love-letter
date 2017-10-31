var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://aqfprdaxqkgkns:633f14ce675acb4943734371cb47d8f8004599e783f47da75e922728b9c3647c@ec2-184-73-247-240.compute-1.amazonaws.com:5432/d65rfqd63aijae";

var db = new pg.Client(conString);
db.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/tests", (request, response) => {
  db.query(`INSERT INTO test_table ("testString") VALUES ('Hello at ${Date.now()}')`)
  	.then( _ => db.query('SELECT * FROM test_table') )
  	.then( results => response.json( results ) )
  	.catch( error => {
  		console.log( error )
  		response.json({error})
  	})
});


module.exports = router;
