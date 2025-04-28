import { checkplayerhand, decide_twopair_kicker, full_house_kicker, getcardsforkicker, twopair_kicker, kicker } from "./hand_check.js"
import './chips.js';
import './players.js'
import { Player } from "./players.js";
import { createEndRoundContainer } from "./gui.js";
import { removeEndRoundContainer } from "./gui.js";
import { removeGame } from "./gui.js";
import { createHomePage } from "./gui.js";
import { getRankValue } from "./hand_check.js";
import "./chips.js";
import { betChips, getAnte, getCurr, setCurrentBet, tieGame, updateChips, winPot } from "./chips.js";
import { findProbabilty } from "./probabity.js";

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
export let dealer = new Player;
dealer.hand = [];
dealer.chips = 10000;
let community = [];
let gameState = 0;
let start = true;

//create a random number between 0 and 51 to draw a card, regenerate if card is in the discard
function drawCard(override) {
    let card = -1;

    //draw preselected card if override is set
    if(override != undefined) {
        card = override

        //log warning if card duplicate
        if(discard.includes(card)) {
            console.warn("drawCard(override) is using a card that already exists")
        }
    }
    //otherwise randomly select
    else {
        card = Math.floor(Math.random() * 52);

        console.log("drawing card...")

        while(discard.includes(card)) {
            card++;
        }
    }
    

    return card;
}

//draw two cards to the player and dealer hand, only displays the player's cards
export function gameStart() {
    console.log("Starting game...");

    if(start){buttonFunctions();start = false;}

    updateChips(playerOne, "playerChipsPrint");
    updateChips(dealer, "dealerChipsPrint");

    //get player cards first
    for(let i = 0; i < 2; i++) {
        let card = drawCard();
        discard.push(card);
        playerOne.hand.push(deck[card]);
        console.log(deck[card]);
    }

    //get dealer cards next
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

//draw the flop, three cards to the community, First,
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

//empty the arrays at the end of a round and changes the displayed cards to be card backs
export function roundEnd() {
    console.log("Ending round...")
    discard = [];
    playerOne.hand = [];
    dealer.hand = [];
    community = [];
    gameState = 0;
    setSlider();
    
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

//revel the dealers cards
function reveal() {
    document.getElementById("dealerOne").src = dealer.hand[0].svgRef;
    document.getElementById("dealerTwo").src = dealer.hand[1].svgRef;
}

function resetGame() {
    console.log("----------Reset Game----------");
    removeEndRoundContainer();
    roundEnd();
    gameStart();
    playerPercents();

    const buttons = document.getElementsByTagName("button");
    for(const button of buttons) {button.disabled = false;}
}

//reset all changed values and return to the play game screen
export function endGame() {
    

    console.log("----------End Game----------")
    removeEndRoundContainer();
    playerOne.chips = 1000;
    dealer.chips = 10000;
    start = true;
    roundEnd();
    removeGame();
    createHomePage();

    const buttons = document.getElementsByTagName("button");
    for(const button of buttons) { button.disabled = false; }
}

//compare player and dealer hands for teh end round container
function compareHands(playerHand, dealerHand) {
    let hands = ["high card", "one pair", "two pair", "three of a kind", "straight", "flush", "full house", "four of a kind", "straight flush", "royal flush"];
    let playerHandValue = hands.indexOf(playerHand.hand_value);
    let dealerHandValue = hands.indexOf(dealerHand.hand_value);

    if(playerHandValue > dealerHandValue) {
        console.log("player wins");
        winPot(playerOne);
        return "player wins with " + playerHand.hand_value;
    }
    else if(dealerHandValue > playerHandValue) {
        console.log("dealer wins");
        winPot(dealer);
        return "dealer wins with " + dealerHand.hand_value;
    }
    else {
        let playerHighCard = getRankValue(playerHand.highcard);
        let dealerHighCard = getRankValue(dealerHand.highcard);

        if(playerHighCard > dealerHighCard) {
            console.log("player wins");
            winPot(playerOne);
            return "player wins with a high card of" + playerHand.highcard;
        }
        else if(dealerHighCard > playerHighCard) {
            console.log("dealer wins");
            winPot(dealer);
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
                    winPot(playerOne);
                    return "player wins with two pair kicker of " + result[1]
                }
                else if(result[0] == "player 2 wins") {
                        console.log("dealer wins")
                        winPot(dealer);
                        return "dealer wins with two pair kicker of " + result[1]
                }
                else {
                    var kickerResult = kicker(
                        getcardsforkicker(playerOne.hand, community),
                        getcardsforkicker(dealer.hand, community)
                    ) || ["tie", 0];  // Fallback if kicker returns undefined
                    
                    if(kickerResult[0] == "player 1 wins") {
                        console.log("player wins")
                        winPot(playerOne);
                        return "player wins with a kicker of " + kickerResult[1]
                    } else if(kickerResult[0] == "player 2 wins") {
                        console.log("dealer wins")
                        winPot(dealer);
                        return "dealer wins with a kicker of " + kickerResult[1]
                    } else {
                        console.log("tie")
                        tieGame(playerOne, dealer);
                        return "tie"
                    }
                }
            }
            else if(playerHand.hand_value == "full house" && dealerHand.hand_value == "full house") {
                var playerfullHouseKicker = full_house_kicker(playerOne.hand, community);
                var dealerfullHouseKicker = full_house_kicker(dealer.hand, community);

                if(playerfullHouseKicker > dealerfullHouseKicker) {
                    console.log("player wins")
                    winPot(playerOne);
                    return "player wins with a full house kicker of " + playerfullHouseKicker
                }
                else if(dealerfullHouseKicker > playerfullHouseKicker) {
                    console.log("dealer wins")
                    winPot(dealer);
                    return "dealer wins with a full house kicker of " + dealerfullHouseKicker
                }
                else {
                    var kickerResult = kicker(
                        getcardsforkicker(playerOne.hand, community),
                        getcardsforkicker(dealer.hand, community)
                    ) || ["tie", 0];  // Fallback if kicker returns undefined
                    
                    if(kickerResult[0] == "player 1 wins") {
                        console.log("player wins")
                        winPot(playerOne);
                        return "player wins with a kicker of " + kickerResult[1]
                    }
                    else if(kickerResult[0] == "player 2 wins") {
                        console.log("dealer wins")
                        winPot(dealer);
                        return "dealer wins with a kicker of " + kickerResult[1]
                    }
                    else {
                        console.log("tie")
                        tieGame(playerOne, dealer);
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
                    winPot(playerOne);
                    return "player wins with a kicker of " + kickerResult[1]
                }
                else if(kickerResult[0] == "player 2 wins") {
                    console.log("dealer wins")
                    winPot(dealer);
                    return "dealer wins with a kicker of " + kickerResult[1]
                }
                else {
                    console.log("tie")
                    tieGame(playerOne, dealer);
                    return "tie"
                }
            }
        }
    }
}

//add functionality to the betting buttons 
function buttonFunctions(){
    //player matches the current ante
    let checkButton = document.getElementById("check-button");
    checkButton.addEventListener("click", () => {
        console.log("check " + getAnte());
        betChips(playerOne, getAnte());
        betChips(dealer, getAnte());
        updateChips(playerOne, "playerChipsPrint");
        updateChips(dealer, "dealerChipsPrint");
        gameIterate();
    });

    //player matches the current bet
    let callbutton = document.getElementById("call-button");
    callbutton.addEventListener("click", () =>{
        console.log("call " + getCurr());
        betChips(playerOne, getCurr());
        betChips(dealer, getCurr());
        updateChips(playerOne, "playerChipsPrint");
        updateChips(dealer, "dealerChipsPrint");
        gameIterate();
    });

    //player folds and dealer wins, immediately ends the round
    let foldButton = document.getElementById("fold-button");
    foldButton.addEventListener("click", () =>{
        console.log("fold");

        winPot(dealer);
        updateChips(dealer, "dealerChipsPrint");

        reveal();

        const buttons = document.getElementsByTagName("button");
        for(const button of buttons) { button.disabled = true; }

        createEndRoundContainer("player Folds");

        document.getElementById("newRoundButton").addEventListener("click", resetGame);
        document.getElementById("endGameButton").addEventListener("click", endGame);
    });

    //player makes a bet that equal to or greater then the current ante
    document.getElementById("bet-button").addEventListener("click", () =>{
        console.log(document.getElementById("bet-raise-slider").value);
        let bet = document.getElementById("bet-raise-slider").value;
        console.log(bet);
        setCurrentBet(bet);
        betChips(playerOne, getCurr());
        betChips(dealer, getCurr());
        updateChips(playerOne, "playerChipsPrint");
        updateChips(dealer, "dealerChipsPrint");
        gameIterate();
    });

    //player raises to the current bet
    document.getElementById("raise-button").addEventListener("click", () =>{
        console.log(document.getElementById("bet-raise-slider").value);
        let bet = document.getElementById("bet-raise-slider").value;
        console.log(bet);
        setCurrentBet(bet);
        betChips(playerOne, getCurr());
        betChips(dealer, getCurr());
        updateChips(playerOne, "playerChipsPrint");
        updateChips(dealer, "dealerChipsPrint");
        gameIterate();
    });
}

//sets the slider fo bet and raise to be in range of the lowest and highest possible bets
function setSlider(){
    let curr = getCurr();
    const slider = document.getElementById("bet-raise-slider");
    slider.max = playerOne.chips;
    slider.min = curr;
}

//runs probability and displays the percentages in poker hand table
function playerPercents(){
    let percents = findProbabilty(playerOne.hand, community);
    let text = '';
    for(let x in percents){
        if(percents[x] != '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'){text = " " + percents[x] + "%";}
        else{text = " " + percents[x];}
        if(x == 0){document.getElementById("tableOnePair").innerText = text;}
        if(x == 1){document.getElementById("tableTwoPair").innerText = text;}
        if(x == 2){document.getElementById("tableThreeofaKind").innerText = text;}
        if(x == 3){document.getElementById("tableStraight").innerText = text;}
        if(x == 4){document.getElementById("tableFlush").innerText = text;}
        if(x == 5){document.getElementById("tableFullHouse").innerText = text;}
        if(x == 6){document.getElementById("tableFourofaKind").innerText = text;}
        if(x == 7){document.getElementById("tableStraightFlush").innerText = text;}
        if(x == 8){document.getElementById("tableRoyalFlush").innerText = text;}
    }
}

//gamestate iteration
export function gameIterate() {
    console.log("Begin iteration...")
    let ante = getAnte();
    setSlider();

    //beegining of round, deals players cards
    if(gameState == 0) {
        gameStart();
        playerPercents();
        gameState++;
    }
    //deals the flop, first three cards of the community
    else if(gameState == 1) {
        flop();
        document.getElementById("communityOne").src = community[0].svgRef;
        document.getElementById("communityTwo").src = community[1].svgRef;
        document.getElementById("communityThree").src = community[2].svgRef;
        playerPercents();
        gameState++;
    }
    //if gamesstate is 2 plays the turn, if gamestate is 3 plays the river, one card to community, the player can make a bet after all fve cards are drawn
    else if(gameState == 2 || gameState == 3) {
        oneCard();
        if(gameState == 2) { document.getElementById("communityFour").src = community[3].svgRef; }
        if(gameState == 3) { document.getElementById("communityFive").src = community[4].svgRef; }
        playerPercents();
        gameState++;
    }
    //reveals the dealer cards and decides a winner, asks if player want to play another round or end game
    else if(gameState == 4) {
        reveal();
        
        let playerHand = checkplayerhand(playerOne.hand, community);
        let dealerHand = checkplayerhand(dealer.hand, community);
        console.log(playerHand.hand_value + " " + playerHand.highcard);
        console.log(dealerHand.hand_value + " " + dealerHand.highcard);

        const buttons = document.getElementsByTagName("button");
        for(const button of buttons) {button.disabled = true;}

        createEndRoundContainer(compareHands(playerHand, dealerHand));

        document.getElementById("newRoundButton").addEventListener("click", resetGame);
        document.getElementById("endGameButton").addEventListener("click", endGame);
    }
    //if player decides to end game gamestate will reach 5
    else if(gameState == 5) {
        endGame;
    }

    setCurrentBet(ante);
    console.log("End iteration...");
}