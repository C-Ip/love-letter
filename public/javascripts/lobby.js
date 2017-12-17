const ROOM_ID = 'room-id';
const USER_ID = 'user-id';
const USER_NAME = 'username';
const ROOM_CREATED = 'room-created';
var game_id = 0;
// local_data is found in index.pug
var currPlayer = local_data.playerid;

var socket = io();

var imageList = ['/images/guard.jpg', '/images/2.jpeg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpeg', '/images/7.jpg', '/images/8.jpeg'];

$(function () {
  $('#chat').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  $('#joingame').submit( function(){
    socket.emit('joingame',game_id);
  });

  $('#creategames').click(function() {
    socket.emit('createdgame', currPlayer);
  });

  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
    
  });

});
