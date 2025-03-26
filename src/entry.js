
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