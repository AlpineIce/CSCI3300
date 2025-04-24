import { initializeGui } from "./gui.js";
import { gameIterate } from "./card_logic.js";

//should be a button event
export function startGame() {
    //remove start button
    document.getElementById("start-button-container").remove();

    //Hide the poker rules section
    const pokerRules = document.getElementById("poker-rules");
    if (pokerRules) {
        pokerRules.style.display = "none";
        
    }

    //initialize GUI
    initializeGui();

    gameIterate();
}

//entry point function
document.addEventListener("DOMContentLoaded", () => {
    //start button event; entry point of a game
    document.getElementById("start-button").addEventListener("click", () => {
        startGame();
    });
});