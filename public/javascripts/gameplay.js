function selectCard(id) {
    id.style.border = '3px solid #1ec5e5';
};

function playFunction() {
  game.join('game1');
  game.to('game1').emit('playcard');
};
