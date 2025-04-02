//initiallize the deck as an array of objects representing each card
const deck = [ 'H1' = {'suit' : 'heart', 'number' : '1'}, 'H2' = {'suit' : 'heart', 'number' : '2'}, 'H3' = {'suit' : 'heart', 'number' : '3'}, 'H4'= {'suit' : 'heart', 'number' : '4'}, 'H5'= {'suit' : 'heart', 'number' : '5'}, 'H6'= {'suit' : 'heart', 'number' : '6'}, 'H7'= {'suit' : 'heart', 'number' : '7'}, 'H8'= {'suit' : 'heart', 'number' : '8'}, 'H9'= {'suit' : 'heart', 'number' : '9'}, 'H10'= {'suit' : 'heart', 'number' : '10'}, 'HJ'= {'suit' : 'heart', 'number' : 'jack'}, 'HQ'= {'suit' : 'heart', 'number' : 'queen'}, 'HK'= {'suit' : 'heart', 'number' : 'king'}, 'HA'= {'suit' : 'heart', 'number' : 'ace'},
    'S1'= {'suit' : 'spade', 'number' : '1'}, 'S2'= {'suit' : 'spade', 'number' : '2'}, 'S3'= {'suit' : 'spade', 'number' : '3'}, 'S4'= {'suit' : 'spade', 'number' : '4'}, 'S5'= {'suit' : 'spade', 'number' : '5'}, 'S6'= {'suit' : 'spade', 'number' : '6'}, 'S7'= {'suit' : 'spade', 'number' : '7'}, 'S8'= {'suit' : 'spade', 'number' : '8'}, 'S9'= {'suit' : 'spade', 'number' : '9'}, 'S10'= {'suit' : 'spade', 'number' : '10'}, 'SJ'= {'suit' : 'spade', 'number' : 'jack'}, 'SQ'= {'suit' : 'spade', 'number' : 'queen'}, 'SK'= {'suit' : 'spade', 'number' : 'king'}, 'SA'= {'suit' : 'spade', 'number' : 'ace'},
    'D1'= {'suit' : 'diamond', 'number' : '1'}, 'D2'= {'suit' : 'diamond', 'number' : '2'}, 'D3'= {'suit' : 'diamond', 'number' : '3'}, 'D4'= {'suit' : 'diamond', 'number' : '5'}, 'D5'= {'suit' : 'diamond', 'number' : '5'}, 'D6'= {'suit' : 'diamond', 'number' : '6'}, 'D7'= {'suit' : 'diamond', 'number' : '7'}, 'D8'= {'suit' : 'diamond', 'number' : '8'}, 'D9'= {'suit' : 'diamond', 'number' : '9'}, 'D10'= {'suit' : 'diamond', 'number' : '10'}, 'DJ'= {'suit' : 'diamond', 'number' : 'jack'}, 'DQ'= {'suit' : 'diamond', 'number' : 'queen'}, 'DK'= {'suit' : 'diamond', 'number' : 'king'}, 'DA'= {'suit' : 'diamond', 'number' : 'king'},
    'C1'= {'suit' : 'club', 'number' : '1'}, 'C2'= {'suit' : 'club', 'number' : '2'}, 'C3'= {'suit' : 'club', 'number' : '3'}, 'C4'= {'suit' : 'club', 'number' : '4'}, 'C5'= {'suit' : 'club', 'number' : '5'}, 'C6'= {'suit' : 'club', 'number' : '6'}, 'C7'= {'suit' : 'club', 'number' : '7'}, 'C8'= {'suit' : 'club', 'number' : '8'}, 'C9'= {'suit' : 'club', 'number' : '9'}, 'C10'= {'suit' : 'club', 'number' : '10'}, 'CJ'= {'suit' : 'club', 'number' : 'jack'}, 'CQ'= {'suit' : 'club', 'number' : 'queen'}, 'CK'= {'suit' : 'club', 'number' : 'king'}, 'CA'= {'suit' : 'club', 'number' : 'ace'}
]

//initiallize discard pile, community pile, and player hand as an array
let discard = [];
let playerHand = [];
let community = [];

//create a random number between 0 and 51 to draw a card, regenerate if card is in the discard
function drawCard(){
    let card = Math.floor(Math.random * 52);
    if(discard.includes(card)) {
        card = drawCard();
    }
    return card;
}

//draw two cards to the players hand
export function gameStart(){
    for (i = 0; i < 1; i++){
        let card = drawCard();
        discard.push(card);
        playerHand.push(card);
    }
}

//draw the flop, three cards to the community, First
export function flop(){
    for(i = 0; i < 2; i++){
        let card = drawCard();
        discard.push(card);
        community.push(card);
    }
}

//draw the turn or the river, one card to community, Second and Third
export function oneCard(){
    let card = drawCard();
    discard.push(card);
    community.push(card);
}

//empty the arrays at the end of a game
export function gameEnd(){
    discard = [];
    playerHand = [];
    community = [];
}