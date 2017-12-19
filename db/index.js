
var promise = require('bluebird');
var initOptions = {
  promiseLib: promise
};
var pgp = require('pg-promise')(initOptions);

var db = {
    host: 'localhost',
    post: 5432,
    database: 'practicedatabase',
    user: 'calvin',
    password: 'lop43ioa'
};

var connection = pgp(process.env.DATABASE_URL || db);

module.exports = connection;
