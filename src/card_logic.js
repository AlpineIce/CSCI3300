import { checkplayerhand, decide_twopair_kicker, full_house_kicker, getcardsforkicker, twopair_kicker, kicker } from "./hand_check.js"
import './chips.js';
import './players.js'
import { Player } from "./players.js";
import { createEndRoundContainer } from "./gui.js";
import { removeEndRoundContainer } from "./gui.js";
import { removeGame } from "./gui.js";
import { createHomePage } from "./gui.js";
import { getRankValue } from "./hand_check.js";
//initiallize the deck as an array of objects representing each card
const deck = [ {suit : 'heart', number : '2', svgRef : './Cards/H2.svg'}, {suit : 'heart', number : '3', svgRef : './Cards/H3.svg'}, {suit : 'heart', number : '4', svgRef : './Cards/H4.svg'}, {suit : 'heart', number : '5', svgRef : './Cards/H5.svg'}, {suit : 'heart', number : '6', svgRef : './Cards/H6.svg'}, {suit : 'heart', number : '7', svgRef : './Cards/H7.svg'}, {suit : 'heart', number : '8', svgRef : './Cards/H8.svg'}, {suit : 'heart', number : '9', svgRef : './Cards/H9.svg'}, {suit : 'heart', number : '10', svgRef : './Cards/H10.svg'}, {suit : 'heart', number : 'jack', svgRef : './Cards/HJ.svg'}, {suit : 'heart', number : 'queen', svgRef : './Cards/HQ.svg'}, {suit : 'heart', number : 'king', svgRef : './Cards/HK.svg'}, {suit : 'heart', number : 'ace', svgRef : './Cards/HA.svg'},
    {suit : 'spade', number : '2', svgRef : './Cards/S2.svg'}, {suit : 'spade', number : '3', svgRef : './Cards/S3.svg'}, {suit : 'spade', number : '4', svgRef : './Cards/S4.svg'}, {suit : 'spade', number : '5', svgRef : './Cards/S5.svg'}, {suit : 'spade', number : '6', svgRef : './Cards/S6.svg'}, {suit : 'spade', number : '7', svgRef : './Cards/S7.svg'}, {suit : 'spade', number : '8', svgRef : './Cards/S8.svg'}, {suit : 'spade', number : '9', svgRef : './Cards/S9.svg'}, {suit : 'spade', number : '10', svgRef : './Cards/S10.svg'}, {suit : 'spade', number : 'jack', svgRef : './Cards/SJ.svg'}, {suit : 'spade', number : 'queen', svgRef : './Cards/SQ.svg'}, {suit : 'spade', number : 'king', svgRef : './Cards/SK.svg'}, {suit : 'spade', number : 'ace', svgRef : './Cards/SA.svg'},
    {suit : 'diamond', number : '2', svgRef : './Cards/D2.svg'}, {suit : 'diamond', number : '3', svgRef : './Cards/D3.svg'}, {suit : 'diamond', number : '4', svgRef : './Cards/D4.svg'}, {suit : 'diamond', number : '5', svgRef : './Cards/D5.svg'}, {suit : 'diamond', number : '6', svgRef : './Cards/D6.svg'}, {suit : 'diamond', number : '7', svgRef : './Cards/D7.svg'}, {suit : 'diamond', number : '8', svgRef : './Cards/D8.svg'}, {suit : 'diamond', number : '9', svgRef : './Cards/D9.svg'}, {suit : 'diamond', number : '10', svgRef : './Cards/D10.svg'}, {suit : 'diamond', number : 'jack', svgRef : './Cards/DJ.svg'}, {suit : 'diamond', number : 'queen', svgRef : './Cards/DQ.svg'}, {suit : 'diamond', number : 'king', svgRef : './Cards/DK.svg'}, {suit : 'diamond', number : 'ace', svgRef : './Cards/DA.svg'},
    {suit : 'club', number : '2', svgRef : './Cards/C2.svg'}, {suit : 'club', number : '3', svgRef : './Cards/C3.svg'}, {suit : 'club', number : '4', svgRef : './Cards/C4.svg'}, {suit : 'club', number : '5', svgRef : './Cards/C5.svg'}, {suit : 'club', number : '6', svgRef : './Cards/C6.svg'}, {suit : 'club', number : '7', svgRef : './Cards/C7.svg'}, {suit : 'club', number : '8', svgRef : './Cards/C8.svg'}, {suit : 'club', number : '9', svgRef : './Cards/C9.svg'}, {suit : 'club', number : '10', svgRef : './Cards/C10.svg'}, {suit : 'club', number : 'jack', svgRef : './Cards/CJ.svg'}, {suit : 'club', number : 'queen', svgRef : './Cards/CQ.svg'}, {suit : 'club', number : 'king', svgRef : './Cards/CK.svg'}, {suit : 'club', number : 'ace', svgRef : './Cards/CA.svg'}
]

//initiallize discard pile, community pile, and player hand as an array
let discard = [];
let playerOne = new Player;
playerOne.hand = []
playerOne.chips = 1000;
let dealer = new Player;
dealer.hand = [];
dealer.chips = 10000;
let community = [];
let gameState = 0;
let end;

//create a random number between 0 and 51 to draw a card, regenerate if card is in the discard
function drawCard() {
    let card = Math.floor(Math.random() * 52);
    console.log("drawing card...")

    if(discard.includes(card)) {
        card = drawCard();
    }

    return card;
}

//draw two cards to the player and dealer hand
export function gameStart() {
    console.log("Starting game...")

    for(let i = 0; i < 2; i++) {
        let card = drawCard();
        discard.push(card);
        playerOne.hand.push(deck[card]);
        console.log(deck[card]);
    }

    for(let i = 0; i < 2; i++) {
        let card = drawCard();
        discard.push(card);
        dealer.hand.push(deck[card]);
        console.log(deck[card]);
    }

    document.getElementById("holeOne").src = playerOne.hand[0].svgRef;
    document.getElementById("holeTwo").src = playerOne.hand[1].svgRef;

    for(let x in playerOne.hand)
        console.log("player hand index: " + x + " = " + playerOne.hand[x].number + " " + playerOne.hand[x].suit);
    for(let x in dealer.hand)
        console.log("dealer hand index: " + x + " = " + dealer.hand[x].number + " " + dealer.hand[x].suit);
}

//draw the flop, three cards to the community, First
export function flop() {
    console.log("Flop...")
    
    for(let i = 0; i < 3; i++) {
        let card = drawCard();
        discard.push(card);
        community.push(deck[card]);
    }

    for(let x in community)
        console.log("community index: " + x + " = " + community[x].number + " " + community[x].suit);
}

//draw the turn or the river, one card to community, Second and Third
export function oneCard() {
    console.log("Drawing one card...")

    let card = drawCard();
    discard.push(card);
    community.push(deck[card]);

    for(let x in community)
        console.log("community index: " + x + " = " + community[x].number + " " + community[x].suit);
}

//empty the arrays at the end of a round
export function roundEnd() {
    console.log("Ending round...")
    discard = [];
    playerOne.hand = [];
    dealer.hand = [];
    community = [];
    gameState = 0;
    
    for(let x in playerOne.hand)
        console.log("player hand index: " + x + " = " + playerOne.hand[x].number + " " + playerOne.hand[x].suit);
    for(let x in dealer.hand)
        console.log("dealer hand index: " + x + " = " + dealer.hand[x].number + " " + dealer.hand[x].suit);
    for(let x in community)
        console.log("community index: " + x + " = " + community[x].number + " " + community[x].suit);
    
    let cards = document.querySelectorAll(".card");
    for(let x = 0; x < cards.length; x++) {
        cards[x].querySelector("img").src = "./Cards/B1.svg";
    }
}

function reveal() {
    document.getElementById("dealerOne").src = dealer.hand[0].svgRef;
    document.getElementById("dealerTwo").src = dealer.hand[1].svgRef;
}

function endGame() {
    roundEnd();
    removeGame();
    createHomePage();
}

function compareHands(playerHand, dealerHand) {
    let hands = ["high card", "one pair", "two pair", "three of a kind", "straight", "flush", "full house", "four of a kind", "straight flush", "royal flush"];
    let playerHandValue = hands.indexOf(playerHand.hand_value);
    let dealerHandValue = hands.indexOf(dealerHand.hand_value);

    if(playerHandValue > dealerHandValue) {
        console.log("player wins");
        return "player wins with " + playerHand.hand_value;
    }
    else if(dealerHandValue > playerHandValue) {
        console.log("dealer wins");
        return "dealer wins with " + dealerHand.hand_value;
    }
    else {
        let playerHighCard = getRankValue(playerHand.highcard);
        let dealerHighCard = getRankValue(dealerHand.highcard);

        if(playerHighCard > dealerHighCard) {
            console.log("player wins");
            return "player wins with a high card of" + playerHand.highcard;
        }
        else if(dealerHighCard > playerHighCard) {
            console.log("dealer wins");
            return "dealer wins with a high card of" + dealerHand.highcard;
        }
        else {
            if(playerHand.hand_value == "two pair" && dealerHand.hand_value == "two pair") {
                var result = decide_twopair_kicker(
                    twopair_kicker(playerOne.hand, community),
                    twopair_kicker(dealer.hand, community)
                );

                if(result[0] ==   "player 1 wins") {
                    console.log("player wins")
                    return "player wins with two pair kicker of " + result[1]
                }
                else if(result[0] == "player 2 wins") {
                        console.log("dealer wins")
                        return "dealer wins with two pair kicker of " + result[1]
                }
                else {
                    var kickerResult = kicker(
                        getcardsforkicker(playerOne.hand, community),
                        getcardsforkicker(dealer.hand, community)
                    ) || ["tie", 0];  // Fallback if kicker returns undefined
                    
                    if(kickerResult[0] == "player 1 wins") {
                        console.log("player wins")
                        return "player wins with a kicker of " + kickerResult[1]
                    } else if(kickerResult[0] == "player 2 wins") {
                        console.log("dealer wins")
                        return "dealer wins with a kicker of " + kickerResult[1]
                    } else {
                        console.log("tie")
                        return "tie"
                    }
                }
            }
            else if(playerHand.hand_value == "full house" && dealerHand.hand_value == "full house") {
                var playerfullHouseKicker = full_house_kicker(playerOne.hand, community);
                var dealerfullHouseKicker = full_house_kicker(dealer.hand, community);

                if(playerfullHouseKicker > dealerfullHouseKicker) {
                    console.log("player wins")
                    return "player wins with a full house kicker of " + playerfullHouseKicker
                }
                else if(dealerfullHouseKicker > playerfullHouseKicker) {
                    console.log("dealer wins")
                    return "dealer wins with a full house kicker of " + dealerfullHouseKicker
                }
                else {
                    var kickerResult = kicker(
                        getcardsforkicker(playerOne.hand, community),
                        getcardsforkicker(dealer.hand, community)
                    ) || ["tie", 0];  // Fallback if kicker returns undefined
                    
                    if(kickerResult[0] == "player 1 wins") {
                        console.log("player wins")
                        return "player wins with a kicker of " + kickerResult[1]
                    }
                    else if(kickerResult[0] == "player 2 wins") {
                        console.log("dealer wins")
                        return "dealer wins with a kicker of " + kickerResult[1]
                    }
                    else {
                        console.log("tie")
                        return "tie"
                    }
                }
            }
            else {
                var kickerResult = kicker(
                    getcardsforkicker(playerOne.hand, community),
                    getcardsforkicker(dealer.hand, community)
                ) || ["tie", 0];  // Fallback if kicker returns undefined
                
                if(kickerResult[0] == "player 1 wins") {
                    console.log("player wins")
                    return "player wins with a kicker of " + kickerResult[1]
                }
                else if(kickerResult[0] == "player 2 wins") {
                    console.log("dealer wins")
                    return "dealer wins with a kicker of " + kickerResult[1]
                }
                else {
                    console.log("tie")
                    return "tie"
                }
            }
        }
    }
}

export function gameIterate() {
    console.log("Begin iteration...")
    if(gameState == 0) {
        gameStart();
        gameState++;
    }
    else if(gameState == 1) {
        flop();
        document.getElementById("communityOne").src = community[0].svgRef;
        document.getElementById("communityTwo").src = community[1].svgRef;
        document.getElementById("communityThree").src = community[2].svgRef;
        gameState++;
    }
    else if(gameState == 2 || gameState == 3) {
        oneCard();
        if(gameState == 2) { document.getElementById("communityFour").src = community[3].svgRef; }
        if(gameState == 3) { document.getElementById("communityFive").src = community[4].svgRef; }
        gameState++;
    }
    else if(gameState == 4) {
        reveal();
        
        let playerHand = checkplayerhand(playerOne.hand, community);
        let dealerHand = checkplayerhand(dealer.hand, community);
        console.log(playerHand.hand_value + " " + playerHand.highcard);
        console.log(dealerHand.hand_value + " " + dealerHand.highcard);

        const buttons = document.getElementsByTagName("button");
        for(const button of buttons) {button.disabled = true;}

        createEndRoundContainer();

        let results = document.createElement("p");
        results.id = "resultText";
        results.innerText = compareHands(playerHand, dealerHand);
        document.getElementById("endRoundContainer").appendChild(results);

        document.getElementById("newRoundButton").addEventListener("click", () => {
            console.log("newround")
            removeEndRoundContainer();
            roundEnd();
            gameStart();
            gameState++;
            const buttons = document.getElementsByTagName("button");
            for(const button of buttons) {button.disabled = false;}
        });
        document.getElementById("endGameButton").addEventListener("click", () => {
            console.log("endGame")
            removeEndRoundContainer();
            endGame();
            const buttons = document.getElementsByTagName("button");
            for(const button of buttons) { button.disabled = false; }
        });
    }
    else if(gameState == 5) {
        endGame;
    }
    console.log("End iteration...");
}