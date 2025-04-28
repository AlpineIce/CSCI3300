import { startGame } from "./entry.js";

let currentStep = 0;
let tutorialOverlay;
let highlightBox;

const tutorialSteps = [
    {
        title: "Welcome to Jack of all Trades",
        content: "This is the tutorial where we will show you all of the parts of the app and take you through a guided hand of poker.",
        target: null,
        position: "center"
    },
    {
        title: "How Poker Works",
        content: "This is Texas Hold'em, one of the most popular forms of poker. In texas hold'em, just like other forms of poker, your goal is to win chips from other players by assembling the strongest hand at the table.",
        target: null,
        position: "center"
    },
    {
        title: "Your Hole Cards",
        content: "These are your hole cards. They are essentially your hand. Only you have access to these and they are part of the 7 cards you can make your 5 card hand from.",
        target: "#hole-cards-container",
        position: "top"
    },
    {
        title: "Community Cards",
        content: "These are the five community cards. They are shared by all players and are used to make the best possible hand. They are revealed in stages, first the flop which consists of the first three cards, then the turn which is the fourth card, and finally the river which is the fifth card.",
        target: "#community-cards-container",
        position: "bottom"
    },
    {
        title: "Action Buttons",
        content: "Use these to check, call, fold, bet, or raise during the game. ",
        target: "#button-container",
        position: "left"
    },
    {
        title: "Call",
        content: "calling will match the current bet. If no one has bet, it will be the same as checking.",
        target: "#button-container",
        position: "left"
    },
    {
        title: "Fold",
        content: "Folding will remove you from the hand. You will lose any chips you have already put in the pot.",
        target: "#button-container",
        position: "left"
    },
    {
        title: "Bet",
        content: "Betting will put chips into the pot. If no one has bet, it will be the same as checking.",
        target: "#button-container",
        position: "left"
    },
    {
        title: "Opponent",
        content: "This is your opponent. You can see their hole cards and their chips. You will get to see their hole cards at the end of the hand.",
        target: "#dealer-cards-container",
        position: "right"
    },
    {
        title: "Poker Hand Rankings",
        content: "Refer to this table shows all poker hands ranked from highest to lowest. It will also show your odds of getting each hand. You can mouse over the table to see the cards that make up each hand.",
        target: "#poker-hand-table",
        position: "right"
    },
    {
        title: "First Hand",
        content: "Now lets go thruogh a full hand of poker so you can see how the game works.",
        target: null,
        position: "right"
    }
];

export function launchTutorial() {
    startGame();
    createTutorialOverlay();
    showCurrentStep();
}

function createTutorialOverlay() {
  
    tutorialOverlay = document.createElement("div");
    tutorialOverlay.id = "tutorial-overlay";
    document.body.appendChild(tutorialOverlay);


    highlightBox = document.createElement("div");
    highlightBox.className = "tutorial-highlight";
    tutorialOverlay.appendChild(highlightBox);
}

function showCurrentStep() {
    const step = tutorialSteps[currentStep];
    
   
    tutorialOverlay.innerHTML = '';
    tutorialOverlay.appendChild(highlightBox);

    const tutorialBox = document.createElement("div");
    tutorialBox.className = "tutorial-box";


    positionTutorialBox(tutorialBox, step);
    
    // box content
    tutorialBox.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.content}</p>
        <div class="tutorial-buttons">
            ${currentStep > 0 ? '<button id="tutorial-prev">Previous</button>' : ''}
            <button id="tutorial-next">
                ${currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
            </button>
        </div>
    `;

    tutorialOverlay.appendChild(tutorialBox);


    if (step.target) {
        highlightElement(step.target);
    }


    document.getElementById("tutorial-next").addEventListener("click", nextStep);
    if (currentStep > 0) {
        document.getElementById("tutorial-prev").addEventListener("click", prevStep);
    }
}

function positionTutorialBox(box, step) {
    box.style.position = "absolute";
    box.style.left = "50%";
    box.style.top = "50%";
    box.style.transform = "translate(-50%, -50%)";
}

function highlightElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const rect = element.getBoundingClientRect();
        highlightBox.style.width = `${rect.width + 20}px`;
        highlightBox.style.height = `${rect.height + 20}px`;
        highlightBox.style.left = `${rect.left - 10}px`;
        highlightBox.style.top = `${rect.top - 10}px`;
        highlightBox.style.display = "block";
    }
}

function nextStep() {
    if (currentStep < tutorialSteps.length - 1) {
        currentStep++;
        showCurrentStep();
    } else {
        endTutorial();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showCurrentStep();
    }
}

function endTutorial() {
    document.body.removeChild(tutorialOverlay);
    currentStep = 0;
}

window.launchTutorial = launchTutorial;