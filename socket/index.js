const ROOM_CREATED = 'room-created';
const JOIN_ROOM = 'join-room';

const socketIO = require('socket.io');
var db = require('../models/index');
var game = require('../models/game');
var currentUIDS = [];
var userIsConnected = true;
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
    var currentUID = null;
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);
    // Messages display in chatbox
    io.emit('userLogin',localStorage.getItem('uUID'))
    console.log("userLogin emitted");

    socket.on('chat message', (msg) => {
      io.emit('chat message',  msg);
    });

    socket.on('game-lobby-message', (msg) => {
      db.getNewestRoom().then( (data) => {
        socket.join(data.gameid);
        io.sockets.in(data.gameid).emit('game-lobby', msg);
      });
    });

    socket.on('game-room-message', (msg) => {
      db.getNewestRoom().then( (data) => {
        socket.join(data.gameid);
        io.sockets.in(data.gameid).emit('game-room', msg);
      });
    });

    socket.on('userLogin',(data)=>{
      if(data !==null){
        if(currentUIDS.includes(data)){
          userIsConnected = true;
          currentUID = data;
        }
      }
    });

    // Creates a shuffled deck for the game
    socket.on('startgame', () => {
      db.getNewestRoom().then( (data) => {
        game.createDeck(deck, removedCards);
        game.startingHand(deck, player1, player2, player3, player4);
        game.drawCard(player1, deck);
        console.log("Deck: " + deck);
        console.log("Player1: " + player1);
        console.log("Player2: " + player2);
        console.log("Player3: " + player3);
        console.log("Player4: " + player4);
        socket.join(data.gameid);
        console.log("Game Room: " + data.gameid);
        io.sockets.in(data.gameid).emit('show', player1);
      }).catch((error) => {
        console.log("Error: " + error);
      });
    });


    socket.on('cardChosen', (data) => {
      db.getNewestRoom().then( (data) => {
        if(turnCounter == 1) {
          if(data.card == 0) {
            io.sockets.in(data.gameid).emit('firstCardPlayed', {card: player1[0]});
          } else {
            io.sockets.in(data.gameid).emit('firstCardPlayed', {card: player1[2]});
          }
          game.playCard(player1, data.card);
          console.log(player1);
        }
      }).catch((error) => {
        console.log("Error: " + error);
      });
    });


    socket.on('joingame',() =>{
      db.joinRoom().then( (data)=>{ //joinRoom: function(request, gameRoomId) {
        var joinedRoom = gameRoomId;
        socket.join(joinedRoom);
        console.log('Room: %s joined.',joinedRoom);
      }).catch((error)=>{
        console.log("Error: " +error)
      });
    });

    socket.on('createdgame', () => {
      db.getNewestRoom().then( (data) => {
        var newRoom = data.gameid + 1;
        socket.join(newRoom);
        console.log('Room: %s created.', newRoom);
      }).catch((error) => {
        console.log("Error: " + error);
      });
    });

    socket.on('disconnect', function(data) {
      userIsConnected = false;
      setTimeout(function(){
        if(!userIsConnected) {currentUIDS.pop(currentUID);}
      },15000);
      connections.splice(connections.indexOf(socket), 1);
      console.log('Disconnected: %s sockets connected', connections.length);
    });

  });
};

module.exports = {init: init};
