//initiallize the deck, discard pile, community pile, and player hand as an array
let deck = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', 'HA',
    'S1', 'S2', 'S3',  'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK', 'SA',
    'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK', 'DK', 'DA',
    'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', 'CA'
]
let discard = []
let playerHand = []
let community = []

//should be a button event
function startGame() {
    //remove start button
    let gameArea = document.getElementById("start-button-container").remove();

    //TODO implement setup logic in here
    let gameContainer = document.getElementById("game-container");

    let exampleElement = document.createElement("p");
    exampleElement.innerText = ("Example game start functionality... TODO");
    gameContainer.appendChild(exampleElement);
}

//entry point function
document.addEventListener("DOMContentLoaded", () => {
    //start button event; entry point of a game
    document.getElementById("start-button").addEventListener("click", () => {
        startGame();
    });
});

//create a random number between 0 and 51 to draw a card, regenerate if card is in the discard
function drawCard(){
    let card = Math.floor(Math.random * 51)
    if(discard.includes(card)) {
        card = drawCard()
    }
    return card;
}

//draw two cards to the players hand
function gameStart(){
    for (i=0; i<1;i++){
        let card = drawCard()
        discard.push(card)
        playerHand.push(card)
    }
}

//draw the flop, three cards to the community, First
function flop(){
    for(i=0; i < 2; i++){
        let card = drawCard()
        discard.push(card)
        community.push(card)
    }
}

//draw the turn, one card to community, Second
function turn(){
    let card = drawCard()
    discard.push(card)
    community.push(card)
}

//draw the river, one card to the community, Last 
function river(){
    let card = drawCard()
    discard.push(card)
    community.push(card)
}

//empty the arrays at the end of a game
function gameEnd(){
    discard = []
    playerHand = []
    community = []
}