
var promise = require('bluebird');
var initOptions = {
  promiseLib: promise
};
var pgp = require('pg-promise')(initOptions);

var db = {
    host: 'localhost',
    post: 5432,
    database: 'example',
    user: 'trifoo',
    password: '12345'
};

var connection = pgp(process.env.DATABASE_URL || db);

module.exports = connection;
