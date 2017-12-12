var socket = io();

var imageList = ['images/guard.jpg', '/images/2.jpeg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpeg', '/images/7.jpg', '/images/8.jpeg'];

function selectCard(id) {
  if(id.style.borderStyle == 'none') {
    id.style.border = '3px #1ec5e5';
    id.style.borderStyle = 'solid';
    document.getElementById('playcard').style.visibility = 'visible';
  } else {
    id.style.borderStyle = 'none';
  }
};

function playFunction() {
  socket.emit('playcard');
  document.getElementById('playcard').style.visibility = 'hidden';
  document.getElementById('endturn').style.visibility = 'visible';
};

function endTurnFunction() {
  socket.emit('startTurn');
};
