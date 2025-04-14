import { gameIterate } from "./card_logic.js";

function getNewCardSprite() {
    const container = document.createElement("div");
    container.classList.add("card");
    return container;
}

function createPokerHandTable() {
    const handTableContainer = document.createElement("div");
    handTableContainer.id = "poker-hand-table";

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
    container.id = "button-container"
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
        gameIterate();
    });

    const callButton = createButton("Call", "call-button", (value) => {
        console.log("Player calls");
        gameIterate();
    });

    const foldButton = createButton("Fold", "fold-button", () => {
        console.log("Player folds");
        gameIterate();
    });

    container.appendChild(checkButton);
    container.appendChild(callButton);
    container.appendChild(foldButton);

    container.appendChild(createButtonSliderPair(50, 500, 
        //bet event
        (value) => {
            console.log("Bet: " + value); gameIterate();
        },
        //raise event
        (value) => {
            console.log("Raise: " + value); gameIterate();
        }
    ));
}

function createCommunityCardsContainer() {
    const container = document.createElement("div");
    container.id = "community-cards-container"
    document.body.appendChild(container);

    for (let i = 0; i < 5; i++) {
        container.appendChild(getNewCardSprite());
    }
}

function createHoleCardsContainer() {
    const container = document.createElement("div");
    container.id = "hole-cards-container"
    document.body.appendChild(container);

    container.appendChild(getNewCardSprite());
    container.appendChild(getNewCardSprite());
}

export function initializeGui() {
    createPokerHandTable();
    createInteractionContainer();
    createCommunityCardsContainer();
    createHoleCardsContainer();
}
