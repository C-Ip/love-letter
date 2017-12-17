var socket = io();
var currPlayer = local_data.playerid;
var cardChosen = 0;

var imageArray = new Array();
var imageList = ['images/guard.jpg', '/images/2.jpeg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpeg', '/images/7.jpg', '/images/8.jpeg'];
for(i = 0; i < 8; i++) {
  imageArray[i] = new Image();
  imageArray[i].src = imageList[i];
};

function startGame() {
  socket.emit('startgame', currPlayer);
  document.getElementById('begin').style.visibility = 'hidden';
  document.getElementById('player2').style.visibility = 'hidden';
  document.getElementById('player3').style.visibility = 'hidden';
  document.getElementById('player4').style.visibility = 'hidden';
};

function guard(cardValue, cardPosition) {
  document.getElementById('player2').style.visibility = 'visible';
  document.getElementById('player3').style.visibility = 'visible';
  document.getElementById('player4').style.visibility = 'visible';
};

function priest(cardValue, cardPosition) {
  document.getElementById('player2').style.visibility = 'visible';
};

function baron(cardValue, cardPosition) {
  document.getElementById('player2').style.visibility = 'visible';
};

function handmaid(cardValue, cardPosition) {
  document.getElementById('player2').style.visibility = 'visible';
};

function prince(cardValue, cardPosition) {
  document.getElementById('player2').style.visibility = 'visible';
};

function king(cardValue, cardPosition) {
  document.getElementById('player2').style.visibility = 'visible';
};

function countess(cardValue, cardPosition) {
  document.getElementById('player2').style.visibility = 'visible';
};

function princess(cardValue, cardPosition) {
  document.getElementById('player2').style.visibility = 'visible';
};

function firstCardChosen() {
  cardChosen = 0;
  document.getElementById('playerCard1_1').style.border = '3px solid #1ec5e5';
  document.getElementById('playerCard1_2').style.border = 'none';
  document.getElementById('playcard').style.visibility = 'visible';
};

function secondCardChosen() {
  cardChosen = 1;
  document.getElementById('playerCard1_2').style.border = '3px solid #1ec5e5';
  document.getElementById('playerCard1_1').style.border = 'none';
  document.getElementById('playcard').style.visibility = 'visible';
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
  socket.emit('playcard', {card: cardChosen, playerid: currPlayer});
  document.getElementById('playerCard1_1').style.border = 'none';
  document.getElementById('playerCard1_2').style.border = 'none';
  document.getElementById('playcard').style.visibility = 'hidden';
  document.getElementById('endturn').style.visibility = 'visible';
};

function endTurnFunction() {
  document.getElementById('playcard').style.visibility = 'hidden';
  document.getElementById('endturn').style.visibility = 'hidden';
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
    $('#playerCard2_1').removeAttr('src');
    $('#playerCard3_1').removeAttr('src');
    $('#playerCard4_1').removeAttr('src');
  });

  socket.on('game-room', function(msg) {
    $('#gameroommessages').append($('<li>').text(msg));
  });

  socket.on('cardPlayed', function(card) {
    if(card.cardPosition == 0) {
      $('#playerCard1_1').removeAttr('src');
    } else {
      $('#playerCard1_2').removeAttr('src');
    }
    switch(card.value) {
      case '1':
        guard(card.value, card.cardPosition);
        $('#gameroommessages').append($('<li>').text('Player ' + card.playerid + ' has played a Guard'));
        break;
      case '2':
        priest(card.value, card.cardPosition);
        $('#gameroommessages').append($('<li>').text('Player ' + card.playerid + ' has played a Priest'));
        break;
      case '3':
        baron(card.value, card.cardPosition);
        $('#gameroommessages').append($('<li>').text('Player ' + card.playerid + ' has played a Baron'));
        break;
      case '4':
        handmaid(card.value, card.cardPosition);
        $('#gameroommessages').append($('<li>').text('Player ' + card.playerid + ' has played a Handmaid'));
        break;
      case '5':
        prince(card.value, card.cardPosition);
        $('#gameroommessages').append($('<li>').text('Player ' + card.playerid + ' has played a Prince'));
        break;
      case '6':
        king(card.value, card.cardPosition);
        $('#gameroommessages').append($('<li>').text('Player ' + card.playerid + ' has played a King'));
        break;
      case '7':
        countess(card.value, card.cardPosition);
        $('#gameroommessages').append($('<li>').text('Player ' + card.playerid + ' has played a Countess'));
        break;
      case '8':
        princess(card.value, card.cardPosition);
        $('#gameroommessages').append($('<li>').text('Player %s' + card.playerid + ' has played a Princess'));
        break;
      default:
        break;
    }
  });

});
