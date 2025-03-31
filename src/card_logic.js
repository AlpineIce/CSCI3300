//initiallize the deck, discard pile, community pile, and player hand as an array
const deck = [ 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', 'HA',
    'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK', 'SA',
    'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK', 'DK', 'DA',
    'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', 'CA'
]

let discard = [];
let playerHand = [];
let community = [];

//create a random number between 0 and 51 to draw a card, regenerate if card is in the discard
function drawCard(){
    let card = Math.floor(Math.random * 51);
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

//draw the turn, one card to community, Second
export function turn(){
    let card = drawCard();
    discard.push(card);
    community.push(card);
}

//draw the river, one card to the community, Last 
export function river(){
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