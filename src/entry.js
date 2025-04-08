import { initializeGui } from "./gui.js";
import { gameIterate } from "./card_logic.js";

//should be a button event
function startGame() {
    //remove start button
    document.getElementById("start-button-container").remove();

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