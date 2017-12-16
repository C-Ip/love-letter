const ROOM_CREATED = 'room-created';
const JOIN_ROOM = 'join-room';

const socketIO = require('socket.io');
var db = require('../models/index');
var game = require('../models/game');
var connections = [];
var deck = [];
var removedCards = [];
var discard = [];
var player1 = [];
var player2 = [];
var player3 = [];
var player4 = [];
var turnCounter = 1;
var cardToPlay = 0;
var isProtected = [false,false,false,false]// not sure about this

var imageList = ['images/guard.jpg', '/images/2.jpeg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpeg', '/images/7.jpg', '/images/8.jpeg'];

const init = (app, server) => {
  const io = socketIO().listen(server);
  var nsp = io.of('/game');
  io.sockets.on('connection', (socket) => {
    console.log('Connected: %s sockets connected', connections.length);
    // Messages display in chatbox
    socket.on('chat message', (msg) => {
      io.emit('chat message',  msg);
    });

    socket.on('game-lobby-message', (data) => {
      socket.join(data.roomid);
      io.sockets.in(data.roomid).emit('game-lobby-message', data);
    });

    // Creates a shuffled deck for the game
    socket.on('startgame', (data) => {
      console.log("Game Room: " + data.gameid);
      game.createDeck(deck, removedCards);
      game.startingHand(deck, player1, player2, player3, player4);
      game.drawCard(player1, deck);
      console.log("Deck: " + deck);
      console.log("Player1: " + player1);
      console.log("Player2: " + player2);
      console.log("Player3: " + player3);
      console.log("Player4: " + player4);
    });


    socket.on('playcard', (data) => {
      console.log("Player plays a card");
      console.log(data.card);
      // Testing with just one player
      if(turnCounter == 1) {
        game.playCard(player1, data.card);
        console.log(player1);
      }
    });

    socket.on('createdgame', (data) => {
      socket.join(data.gameid);
      console.log('Room: %s created.', data.gameid);
      console.log(socket);
    })


  });
};

module.exports = {init: init};
