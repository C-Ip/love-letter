'use strict';

const passport = require('passport');
const db = require('../db');
var bcrypt = require('bcryptjs');

module.exports = {
  createUser: function(request, response) {
    bcrypt.hash(request.body.password, 10, function(err, hash) {
      db.none("INSERT INTO players(username, password) VALUES('"+ request.body.username +"', '" + hash + "')")
      .then( function() {
        response.redirect('/login');
      });
    });
  },

  verifyLogin: function(request, response) {
    return db.one('SELECT * FROM players WHERE username = $1', [request.body.username])
  },

  getUserByUsername: function(username) {
    return db.one('SELECT * FROM players WHERE username = $1', [username])
  },

  getUserById: function(id) {
    return db.one('SELECT * FROM players WHERE playerid = $1', [id])
  },

  createRoom: function() {
    return db.one('INSERT INTO game(playerturn) VALUES($1) RETURNING gameid', ['0'])
  },

  firstToJoinRoom: function(playerid, gameRoomId) {
    return db.none('INSERT INTO playergame(playerid, gameid, playerpositionid) VALUES($1, $2, $3)', [playerid, gameRoomId, 1])
  },

  getInGameId: function(gameid) {
    return db.one('SELECT max(playerpositionid) FROM playergame WHERE gameid= $1', [gameid])
  },

  joinRoom: function(playerid, gameRoomId, playerpositionid) {
    return db.none('INSERT INTO playergame(playerid, gameid, playerpositionid) VALUES($1, $2, $3)', [playerid, gameRoomId, playerpositionid])
  },

  leaveRoom: function(playerid) {
    return db.none('DELETE FROM playergame WHERE playerid = $1', [playerid])
  },

  getRoom: function() {
    return db.one('SELECT * FROM game')
  },

  getNewestRoom: function() {
    return db.one('SELECT * FROM game WHERE gameid=(SELECT max(gameid) FROM game)')
  },

  getPlayerRoom: function(playerid) {
    return db.one('SELECT gameid FROM playergame WHERE playerid = $1', [playerid])
  },

  getPlayerGameId: function(playerid) {
    return db.one('SELECT playergameid FROM playergame WHERE playerid = $1', [playerid])
  }
};
