let resizeObserver = null;
let resizeEvents = null;

export function initializeDomHandler(gameContainer) {
    //set resize observer
    resizeObserver = new ResizeObserver(() => {
        for(let [key, value] of resizeEvents) {
            value();
        }
    });
    resizeObserver.observe(gameContainer);

    //intitialize map of resize events
    resizeEvents = new Map();
}

export function addResizeEvent(key, event) {
    resizeEvents.set(key, event);
}

export function removeResizeEvent(key) {
    resizeEvents.delete(key);
}

export function getRandomUniqueID() {
    //TODO
    return 0;
}