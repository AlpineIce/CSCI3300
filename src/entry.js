import { initializeDomHandler } from "./dom.js"
import { Sprite } from "./sprite.js";

//should be a button event
function startGame() {
    //remove start button
    //document.getElementById("start-button-container").remove();

    //retrieve game container
    let gameContainer = document.getElementById("game-container");

    //initialize DOM handler
    initializeDomHandler(gameContainer);

    //test sprite
    let testSprite = new Sprite(1.0);
    testSprite.createSprite();
    
    //TODO implement setup logic in here
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