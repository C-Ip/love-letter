var game_id = 0;
var socket = io();
var currPlayer = local_data.playerid;

$(function () {
  $('#gamelobbychat').submit(function() {
    socket.emit('game-lobby-message', {msg: $('#msg').val(), playerid: local_data.playerid});
    $('#msg').val('');
    return false;
  });

  $('#startgame').submit( function() {
    socket.emit('startgame', currPlayer);
  });

  $('#leaveroom').click(function() {
    socket.emit('leavegame', currPlayer);
  });

  socket.on('game-lobby', function(msg) {
    $('#gamelobbymessages').append($('<li>').text(msg));
  });

});
