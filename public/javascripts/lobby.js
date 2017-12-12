const ROOM_ID = 'room-id';
const USER_ID = 'user-id';
const USER_NAME = 'username';
const ROOM_CREATED = 'room-created';
var game_id = 000000;

var socket = io();

var imageList = ['/images/guard.jpg', '/images/2.jpeg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpeg', '/images/7.jpg', '/images/8.jpeg'];

$(function () {
  $('#chat').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  $('#playcard').on('clicked', () => {
    socket.emit('card_played');
  });

  $('#startgame').submit( function() {
    socket.emit('startgame', {gameid: game_id});
  });

  socket.on('startgame', function() {
    drawDeck(context);
  });

  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message',  msg);
  });

  socket.on('showHand', (player) => {
    $('#playerCard1_1').attr('src', imageList[player[0]].src);
  });
});
