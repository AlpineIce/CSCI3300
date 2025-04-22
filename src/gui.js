import { gameIterate } from "./card_logic.js";
import { startGame } from "./entry.js";

function getNewCardSprite(elemId) {
    const container = document.createElement("div");
    container.classList.add("card");
    let img = document.createElement("img");
    img.id = elemId;
    img.src = "./Cards/B1.svg";
    container.appendChild(img);
    return container;
}

function createPokerHandTable() {
    const handTableContainer = document.createElement("div");
    handTableContainer.id = "poker-hand-table";
    handTableContainer.style.backgroundColor = "black";
    handTableContainer.style.color = "white";
    handTableContainer.style.padding = "1em";
    handTableContainer.style.borderRadius = "10px";
    handTableContainer.style.maxWidth = "300px";
    handTableContainer.style.margin = "2em auto";
    handTableContainer.style.fontFamily = "Arial, sans-serif";

    const title = document.createElement("h3");
    title.innerText = "Poker Hands";
    handTableContainer.appendChild(title);

    const hands = [
        { name: "Royal Flush", description: "A, K, Q, J, 10 of the same suit" },
        { name: "Straight Flush", description: "Five cards in a row, same suit" },
        { name: "Four of a Kind", description: "Four cards of the same rank" },
        { name: "Full House", description: "Three of a kind plus a pair" },
        { name: "Flush", description: "Five cards of the same suit" },
        { name: "Straight", description: "Five cards in a row, any suits" },
        { name: "Three of a Kind", description: "Three cards of the same rank" },
        { name: "Two Pair", description: "Two different pairs" },
        { name: "One Pair", description: "Two cards of the same rank" },
        { name: "High Card", description: "When no other hand applies" }
    ];

    const ul = document.createElement("ul");
    hands.forEach(hand => {
        const li = document.createElement("li");
        li.innerText = hand.name;
        li.classList.add("tooltip-target");
        li.dataset.tooltip = hand.description;
        ul.appendChild(li);
    });

    handTableContainer.appendChild(ul);
    document.body.appendChild(handTableContainer);

    const tooltip = document.createElement("div");
    tooltip.id = "tooltip";
    tooltip.style.display = "none";
    document.body.appendChild(tooltip);

    // Tooltip for mouse hover 
    document.addEventListener("mouseover", (e) => {
        if (e.target.classList.contains("tooltip-target")) {
            tooltip.innerText = e.target.dataset.tooltip;
            tooltip.style.display = "block";
        }
    });

    document.addEventListener("mousemove", (e) => {
        tooltip.style.left = e.pageX + 10 + "px";
        tooltip.style.top = e.pageY + 10 + "px";
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.classList.contains("tooltip-target")) {
            tooltip.style.display = "none";
        }
    });
}

function createInteractionContainer() {
    const container = document.createElement("div");
    container.id = "button-container";
    document.body.appendChild(container);

    function createSliderContainer(min, max) {
        const startingValue = min;
        const label = document.createElement("label");
        label.innerText = `Amount: ${startingValue}`;

        const slider = document.createElement("input");
        slider.id = "bet-raise-slider";
        slider.type = "range";
        slider.min = min;
        slider.max = max;
        slider.value = startingValue;

        slider.addEventListener("input", () => {
            label.innerText = `Amount: ${slider.value}`;
        });

        const sliderContainer = document.createElement("div");
        sliderContainer.id = "slider-container";
        sliderContainer.appendChild(label);
        sliderContainer.appendChild(slider);
        return sliderContainer;
    }

    function createButton(label, id, onClick) {
        const button = document.createElement("button");
        button.id = id;
        button.innerText = label;
        button.addEventListener("click", () => {
            const value = document.getElementById("bet-raise-slider").value;
            onClick(value);
        });
        return button;
    }

    function createBetRaiseContainer(betEvent, raiseEvent) {
        const container = document.createElement("div");
        container.id = "bet-raise-buttons-container"
        container.appendChild(createButton("Bet", "bet-button", betEvent));
        container.appendChild(createButton("Raise", "raise-button", raiseEvent));
        return container;
    }

    function createButtonSliderPair(min, max, betEvent, raiseEvent) {
        const container = document.createElement("div");
        container.id = "buttons-with-slider-container";
        container.appendChild(createSliderContainer(min, max));
        container.appendChild(createBetRaiseContainer(betEvent, raiseEvent));
        return container;
    }

    const checkButton = createButton("Check", "check-button", (value) => {
        console.log("Player checks");
    });

    const callButton = createButton("Call", "call-button", (value) => {
        console.log("Player calls");
    });

    const foldButton = createButton("Fold", "fold-button", () => {
        console.log("Player folds");
    });

    container.appendChild(checkButton);
    container.appendChild(callButton);
    container.appendChild(foldButton);

    container.appendChild(createButtonSliderPair(50, 500, 
        //bet event
        (value) => {
            console.log("Bet: " + value); 
        },
        //raise event
        (value) => {
            console.log("Raise: " + value); 
        }
    ));
}

function createCommunityCardsContainer() {
    const container = document.createElement("div");
    container.id = "community-cards-container"
    container.classList.add("card-container");
    document.body.appendChild(container);

    container.appendChild(getNewCardSprite("communityOne"));
    container.appendChild(getNewCardSprite("communityTwo"));
    container.appendChild(getNewCardSprite("communityThree"));
    container.appendChild(getNewCardSprite("communityFour"));
    container.appendChild(getNewCardSprite("communityFive"));
    
}

function createHoleCardsContainer() {
    const container = document.createElement("div");
    container.id = "hole-cards-container"
    container.classList.add("card-container");
    document.body.appendChild(container);

    container.appendChild(getNewCardSprite("holeOne"));
    container.appendChild(getNewCardSprite("holeTwo"));
}

function createDealerCardsContainer() {
    const container = document.createElement("div");
    container.id = "dealer-cards-container";
    container.classList.add("card-container");
    document.body.appendChild(container);

    container.appendChild(getNewCardSprite("dealerOne"));
    container.appendChild(getNewCardSprite("dealerTwo"));
}

export function createEndRoundContainer(){
    const container = document.createElement("div");
    container.id = "endRoundContainer"
    document.body.appendChild(container);
    
    const newRound = document.createElement("button");
    newRound.id = "newRoundButton"
    document.getElementById("endRoundContainer").appendChild(newRound);
    let text = document.createElement("p");
    text.innerText = "New Round";
    document.getElementById("newRoundButton").appendChild(text);

    const endGame = document.createElement("button");
    endGame.id = "endGameButton";
    document.getElementById("endRoundContainer").appendChild(endGame);
    text = document.createElement("p");
    text.innerText = "End Game";
    document.getElementById("endGameButton").appendChild(text);
}

export function removeEndRoundContainer(){
    document.getElementById("endRoundContainer").remove();
}

export function removeGame(){
    document.getElementById("poker-hand-table").remove();
    document.getElementById("tooltip").remove();
    document.getElementById("button-container").remove();
    document.getElementById("community-cards-container").remove();
    document.getElementById("hole-cards-container").remove();
    document.getElementById("dealer-cards-container").remove();
    document.getElementById("potContainer").remove();
    document.getElementById("playerChips").remove();
    document.getElementById("dealerChips").remove();
}

export function createHomePage(){
    const startButtonContainer = document.createElement("div");
    startButtonContainer.id = "start-button-container";
    document.body.appendChild(startButtonContainer);

    const startButton = document.createElement("button");
    startButton.type = "button";
    startButton.id = "start-button";
    startButton.innerText = "Start Game";
    startButton.addEventListener("click", () => {startGame();})
    document.getElementById("start-button-container").appendChild(startButton);
}

export function createPot(){
    const container = document.createElement("div");
    container.id = "potContainer";
    document.body.appendChild(container);
    const potPrint = document.createElement("p");
    potPrint.id = "potPrint";
    document.getElementById("potContainer").appendChild(potPrint);
}

export function createPlayerChips(){
    const container = document.createElement("div");
    container.id = "playerChips";
    document.body.appendChild(container);
    const playerChips = document.createElement("p");
    playerChips.id = "playerChipsPrint";
    document.getElementById("playerChips").appendChild(playerChips);
}

export function createDealerChips(){
    const container = document.createElement("div");
    container.id = "dealerChips"
    document.body.appendChild(container);
    const dealerChips = document.createElement("p");
    dealerChips.id = "dealerChipsPrint";
    document.getElementById("dealerChips").appendChild(dealerChips);
}
export function initializeGui() {
    createPokerHandTable();
    createInteractionContainer();
    createCommunityCardsContainer();
    createHoleCardsContainer();
    createDealerCardsContainer();
    createPot();
    createPlayerChips();
    createDealerChips();
}
