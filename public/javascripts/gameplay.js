var socket = io();
currPlayer = local_data.playerid;

var imageArray = new Array();
var imageList = ['images/guard.jpg', '/images/2.jpeg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpeg', '/images/7.jpg', '/images/8.jpeg'];
for(i = 0; i < 8; i++) {
  imageArray[i] = new Image();
  imageArray[i].src = imageList[i];
};

function startGame() {
  socket.emit('startgame', currPlayer);
};

function selectCard(id) {
  if(id.style.borderStyle == 'none') {
    id.style.border = '3px #1ec5e5';
    id.style.borderStyle = 'solid';
    document.getElementById('playcard').style.visibility = 'visible';
  } else {
    id.style.borderStyle = 'none';
  }
  //document.getElementById('playerCard4_2').src = imageList[5];
};

function playFunction() {
  var cardChosen = 0;
  if(document.getElementById('playerCard1_1').style.borderStyle == 'none') {
    cardChosen = 1;
  }
  if(document.getElementById('playerCard1_2').style.borderStyle == 'none'){
    cardChosen = 0;
  }
  socket.emit('playcard', {card: cardChosen, playerid: currPlayer});
  //document.getElementById('playerCard1_1').setAttribute('src', '/images/guard.jpg');
  document.getElementById('playcard').style.visibility = 'hidden';
  document.getElementById('endturn').style.visibility = 'visible';
};

function endTurnFunction() {
  socket.emit('startTurn');
};

$(function () {
  $('#gameroomchat').submit(function() {
    socket.emit('game-room-message', {msg: $('#gamemsg').val(), playerid: local_data.playerid});
    $('#gamemsg').val('');
    return false;
  });

  socket.on('playgame', function(player) {
    $('#playerCard1_1').attr('src', imageList[player[0] - 1]);
    $('#playerCard1_2').attr('src', imageList[player[1] - 1]);
  });

  socket.on('game-room', function(msg) {
    $('#gameroommessages').append($('<li>').text(msg));
  });

  socket.on('cardPlayed', function(card) {
    if(card.cardPosition == 0) {
      $('#playerCard1_1').removeAttr('src');
    } else {
      $('#playerCard1_1').removeAttr('src');
    }
  });

});
