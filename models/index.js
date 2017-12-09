'use strict';

var db = require('../db');

module.exports = {
  createUser: function(request) {
    return db.none('INSERT INTO players(username, password) VALUES(${username}, ${password})', request.body); 
  },
  
  verifyLogin: function(username, password) {
    return db.one('SELECT * FROM players WHERE username = $1 AND password = $2', [username, password]);
    
  },

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
    deck.shift();  // Removes first card from deck
  }
};
