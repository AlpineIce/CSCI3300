
function createFlexColumnDiv(gameContainer) {
    //create
    let div = document.createElement("div");
    div.style.display = "flex";

    //append
    gameContainer.appendChild(div);

    return div;
}

export function initializeGui(gameContainer) {
    //create 3 divs with flexbox configuration
    let leftColumn = createFlexColumnDiv(gameContainer);
    let centerColumn = createFlexColumnDiv(gameContainer);
    let rightColumn = createFlexColumnDiv(gameContainer);
}