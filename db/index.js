var promise = require('bluebird');
var initOptions = {
  promiseLib: promise
};
var pgp = require('pg-promise')(initOptions);

var db = {
    host: 'localhost',
    post: 5432,
    database: 'd65rfqd63aijae',
    user: 'aqfprdaxqkgkns',
    password: '633f14ce675acb4943734371cb47d8f8004599e783f47da75e922728b9c3647c'
};
  
var connection = pgp(process.env.DATABASE_URL || db);

module.exports = connection;
