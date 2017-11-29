module.exports = Game = function(){
this.deck = [];
this.discards = [];
fillDeck( this.deck );
}

//fills deck with ints which will represent the cards
function fillDeck( deck ){
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
}
