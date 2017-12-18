var game_id = 0;
var socket = io();
var currPlayer = local_data.playerid;
var currentPlayerUsername = local_data.username;

$(function () {
  $('#gamelobbychat').submit(function() {
    socket.emit('game-lobby-message', {msg: $('#msg').val(), playerid: local_data.playerid});
    $('#msg').val('');
    return false;
  });

  $('#leaveroom').click(function() {
    socket.emit('leavegame', currPlayer);
  });

  socket.on('game-lobby', function(msg) {
    $('#gamelobbymessages').append($('<li>').text(currentPlayerUsername + ': ' + msg));
  });

});
