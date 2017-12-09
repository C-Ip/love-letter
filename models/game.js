'use strict';

var db = require('../db');

module.exports = {
  createDeck: (deck) => {
    deck.push('1');
    deck.push('1');
    deck.push('1');
    deck.push('1');
    deck.push('1');
    deck.push('2');
    deck.push('2');
    deck.push('3');
    deck.push('3');
    deck.push('4');
    deck.push('4');
    deck.push('5');
    deck.push('5');
    deck.push('6');
    deck.push('7');
    deck.push('8');
    //shuffles deck
    var i, j, tempi, tempj;
    for( i=0;i< deck.length;i+=1 ){
      j = Math.floor( Math.random() * ( i + 1 ) );
      tempi = deck[i];
      tempj = deck[j];
      deck[i] = tempj;
      deck[j] = tempi;
    }
  },
  
  drawCard: (currentPlayer, deck) => {
    curretPlayer.push(deck[0]);
    deck.pop();  // Removes first card from deck
  },

  playCard: (currentPlayer, card) => {
    if(card == 0) {
      return currentPlayer.pop();
    } else {
      return currentPlayer.shift();
    } 
  },

  compareCards: (currentPlayer, targetPlayer) => {
    var currPlayerCard = currentPlayer[0].value;
    var targetPlayerCard = targetPlayer[0].value;

    if(currPlayerCard > targetPlayerCard) {
      targetPlayer.pop();
    }
    if(currPlayerCard == targetPlayerCard) {
      // Nothing happens display message
    }
    else {
      currentPlayer.pop();
    }
  }
};
