import { initializeGui } from "./gui.js";

//should be a button event
function startGame() {
    //remove start button
    document.getElementById("start-button-container").remove();

    //retrieve game container
    let gameContainer = document.getElementById("game-container");

    //initialize GUI
    initializeGui(gameContainer);
}

//entry point function
document.addEventListener("DOMContentLoaded", () => {
    //start button event; entry point of a game
    document.getElementById("start-button").addEventListener("click", () => {
        startGame();
    });
});