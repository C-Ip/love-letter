var game_id = 0;

var socket = io();

$(function () {
  $('#gamelobbychat').submit(function() {
    socket.emit('game-lobby-message', $('#msg').val());
    $('#msg').val('');
    return false;
  });

  $('#startgame').submit( function() {
    socket.emit('startgame', {gameid: game_id});
  });

  socket.on('game-lobby-message', function(msg) {
    $('#gamelobbymessages').append($('<li>').text(msg));
  });

});
