const CREATED_ROOM = 'created-room';

const socketIO = require('socket.io');
var db = require('../db');
var deckCreation = require('../models');
var deck = [];
var discard = [];

const init = (app, server) => {
  const io = socketIO(server);
  io.sockets.on('connection', (socket) => {
    // Messages display in chatbox
    socket.on('chat message', (msg) => {
      io.emit('chat message',  msg);
    });

    // Creates a shuffled deck for the game
    socket.on('startgame', (data) => {
      deckCreation.createDeck(deck);
      console.log(deck);
    });

  });
};

module.exports = {init: init};
